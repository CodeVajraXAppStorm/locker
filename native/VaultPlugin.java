package com.vaultx.app;

import android.app.Activity;
import android.content.ClipData;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.RectF;
import android.graphics.Paint;
import android.graphics.pdf.PdfDocument;
import android.net.Uri;
import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyPermanentlyInvalidatedException;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import androidx.activity.result.ActivityResult;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import androidx.documentfile.provider.DocumentFile;
import androidx.fragment.app.FragmentActivity;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.tom_roush.pdfbox.android.PDFBoxResourceLoader;
import com.tom_roush.pdfbox.pdmodel.PDDocument;
import com.tom_roush.pdfbox.pdmodel.encryption.AccessPermission;
import com.tom_roush.pdfbox.pdmodel.encryption.StandardProtectionPolicy;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.KeyStore;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

@CapacitorPlugin(name = "Vault")
public class VaultPlugin extends Plugin {

    private static final String ALIAS = "vaultx_bio";

    private interface Done { void run(Cipher c) throws Exception; }

    private SharedPreferences sp() { return getContext().getSharedPreferences("vaultx", 0); }

    private File outDir() {
        File d = new File(getContext().getCacheDir(), "out");
        d.mkdirs();
        return d;
    }

    private void doWipe() {
        File[] f = outDir().listFiles();
        if (f != null) for (File x : f) x.delete();
    }

    @Override
    public void load() { doWipe(); }

    @PluginMethod
    public void wipe(PluginCall c) { doWipe(); c.resolve(); }

    // ---------- Fingerprint ----------
    @PluginMethod
    public void bioAvailable(PluginCall c) {
        boolean ok = Build.VERSION.SDK_INT >= 23 &&
                BiometricManager.from(getContext()).canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)
                        == BiometricManager.BIOMETRIC_SUCCESS;
        JSObject o = new JSObject();
        o.put("ok", ok);
        c.resolve(o);
    }

    private void prompt(PluginCall call, Cipher ci, Done d) {
        getActivity().runOnUiThread(() -> {
            BiometricPrompt bp = new BiometricPrompt((FragmentActivity) getActivity(),
                    ContextCompat.getMainExecutor(getContext()),
                    new BiometricPrompt.AuthenticationCallback() {
                        @Override
                        public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult r) {
                            try { d.run(r.getCryptoObject().getCipher()); }
                            catch (Exception e) { call.reject(String.valueOf(e)); }
                        }
                        @Override
                        public void onAuthenticationError(int code, CharSequence s) { call.reject(String.valueOf(s)); }
                    });
            BiometricPrompt.PromptInfo info = new BiometricPrompt.PromptInfo.Builder()
                    .setTitle("Vault X")
                    .setNegativeButtonText("Use PIN")
                    .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
                    .build();
            bp.authenticate(info, new BiometricPrompt.CryptoObject(ci));
        });
    }

    @PluginMethod
    public void bioEnroll(PluginCall c) {
        try {
            final String secret = c.getString("secret");
            KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
            ks.load(null);
            if (ks.containsAlias(ALIAS)) ks.deleteEntry(ALIAS);
            KeyGenerator kg = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
            kg.init(new KeyGenParameterSpec.Builder(ALIAS, KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
                    .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                    .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                    .setUserAuthenticationRequired(true)
                    .build());
            SecretKey k = kg.generateKey();
            Cipher ci = Cipher.getInstance("AES/GCM/NoPadding");
            ci.init(Cipher.ENCRYPT_MODE, k);
            prompt(c, ci, x -> {
                byte[] ct = x.doFinal(secret.getBytes("UTF-8"));
                byte[] iv = x.getIV();
                byte[] all = new byte[iv.length + ct.length];
                System.arraycopy(iv, 0, all, 0, iv.length);
                System.arraycopy(ct, 0, all, iv.length, ct.length);
                sp().edit().putString("bio", Base64.encodeToString(all, Base64.NO_WRAP)).apply();
                c.resolve();
            });
        } catch (Exception e) { c.reject(String.valueOf(e)); }
    }

    @PluginMethod
    public void bioUnlock(PluginCall c) {
        try {
            String s = sp().getString("bio", "");
            if (s.isEmpty()) { c.reject("invalid"); return; }
            byte[] all = Base64.decode(s, Base64.NO_WRAP);
            final byte[] iv = java.util.Arrays.copyOfRange(all, 0, 12);
            final byte[] ct = java.util.Arrays.copyOfRange(all, 12, all.length);
            KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
            ks.load(null);
            SecretKey k = (SecretKey) ks.getKey(ALIAS, null);
            Cipher ci = Cipher.getInstance("AES/GCM/NoPadding");
            ci.init(Cipher.DECRYPT_MODE, k, new GCMParameterSpec(128, iv));
            prompt(c, ci, x -> {
                JSObject o = new JSObject();
                o.put("secret", new String(x.doFinal(ct), "UTF-8"));
                c.resolve(o);
            });
        } catch (KeyPermanentlyInvalidatedException e) {
            c.reject("invalid");
        } catch (Exception e) { c.reject(String.valueOf(e)); }
    }

    // ---------- Backup folder (एक बार चुनो, याद रहेगा) ----------
    @PluginMethod
    public void folder(PluginCall c) {
        JSObject o = new JSObject();
        o.put("uri", sp().getString("tree", ""));
        c.resolve(o);
    }

    @PluginMethod
    public void pickFolder(PluginCall c) {
        Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION
                | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION | Intent.FLAG_GRANT_PREFIX_URI_PERMISSION);
        startActivityForResult(c, i, "treePicked");
    }

    @ActivityCallback
    private void treePicked(PluginCall c, ActivityResult r) {
        if (c == null) return;
        if (r.getResultCode() != Activity.RESULT_OK || r.getData() == null || r.getData().getData() == null) {
            c.reject("cancel");
            return;
        }
        Uri u = r.getData().getData();
        getContext().getContentResolver().takePersistableUriPermission(u,
                Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        sp().edit().putString("tree", u.toString()).apply();
        JSObject o = new JSObject();
        o.put("uri", u.toString());
        c.resolve(o);
    }

    private DocumentFile tree() throws Exception {
        String s = sp().getString("tree", "");
        if (s.isEmpty()) throw new Exception("no folder");
        return DocumentFile.fromTreeUri(getContext(), Uri.parse(s));
    }

    @PluginMethod
    public void write(PluginCall c) {
        try {
            DocumentFile t = tree();
            String n = c.getString("name");
            DocumentFile old = t.findFile(n);
            if (old != null) old.delete();
            DocumentFile f = t.createFile("application/octet-stream", n);
            try (OutputStream os = getContext().getContentResolver().openOutputStream(f.getUri())) {
                os.write(Base64.decode(c.getString("data"), Base64.DEFAULT));
            }
            c.resolve();
        } catch (Exception e) { c.reject(String.valueOf(e)); }
    }

    @PluginMethod
    public void list(PluginCall c) {
        try {
            JSArray a = new JSArray();
            for (DocumentFile f : tree().listFiles()) if (f.getName() != null) a.put(f.getName());
            JSObject o = new JSObject();
            o.put("names", a);
            c.resolve(o);
        } catch (Exception e) { c.reject(String.valueOf(e)); }
    }

    @PluginMethod
    public void read(PluginCall c) {
        try {
            DocumentFile f = tree().findFile(c.getString("name"));
            if (f == null) { c.reject("missing"); return; }
            try (InputStream is = getContext().getContentResolver().openInputStream(f.getUri())) {
                java.io.ByteArrayOutputStream bo = new java.io.ByteArrayOutputStream();
                byte[] buf = new byte[8192];
                int n;
                while ((n = is.read(buf)) > 0) bo.write(buf, 0, n);
                JSObject o = new JSObject();
                o.put("data", Base64.encodeToString(bo.toByteArray(), Base64.NO_WRAP));
                c.resolve(o);
            }
        } catch (Exception e) { c.reject(String.valueOf(e)); }
    }

    // ---------- PDF + Share ----------
    private void launch(File f, String mime, String mode) {
        Uri u = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", f);
        Intent i;
        if ("view".equals(mode)) {
            i = new Intent(Intent.ACTION_VIEW);
            i.setDataAndType(u, mime);
            i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getActivity().startActivity(i);
        } else {
            i = new Intent(Intent.ACTION_SEND);
            i.setType(mime);
            i.putExtra(Intent.EXTRA_STREAM, u);
            i.setClipData(ClipData.newRawUri("", u));
            i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getActivity().startActivity(Intent.createChooser(i, "Vault X"));
        }
    }

    private String safe(String s) { return s == null ? "document" : s.replaceAll("[^\\p{L}\\p{M}\\p{N}_-]", "_"); }

    private void protect(File f, String pw) throws Exception {
        PDFBoxResourceLoader.init(getContext());
        PDDocument doc = PDDocument.load(f);
        StandardProtectionPolicy spp = new StandardProtectionPolicy(
                java.util.UUID.randomUUID().toString(), pw, new AccessPermission());
        spp.setEncryptionKeyLength(128);
        spp.setPreferAES(true);
        doc.protect(spp);
        File t = new File(f.getPath() + ".enc");
        doc.save(t);
        doc.close();
        f.delete();
        t.renameTo(f);
    }

    private void drawFit(android.graphics.Canvas cv, Bitmap b, float W, float x0, float y0, float bw, float bh, boolean center) {
        float s = Math.min(bw / b.getWidth(), bh / b.getHeight());
        float w = b.getWidth() * s, h = b.getHeight() * s;
        float x = x0 + (bw - w) / 2f;
        float y = center ? y0 + (bh - h) / 2f : y0;
        cv.drawBitmap(b, null, new RectF(x, y, x + w, y + h), new Paint(Paint.FILTER_BITMAP_FLAG));
    }

    @PluginMethod
    public void pdf(PluginCall c) {
        try {
            JSArray arr = c.getArray("images");
            boolean one = "one".equals(c.getString("layout"));
            List<Bitmap> bm = new ArrayList<>();
            for (int i = 0; i < arr.length(); i++) {
                byte[] b = Base64.decode(arr.getString(i), Base64.DEFAULT);
                bm.add(BitmapFactory.decodeByteArray(b, 0, b.length));
            }
            final int W = 595, H = 842;
            PdfDocument pd = new PdfDocument();
            if (one) {
                PdfDocument.Page p = pd.startPage(new PdfDocument.PageInfo.Builder(W, H, 1).create());
                int n = bm.size();
                float boxH = Math.min(330f, (H - 120f - (n - 1) * 30f) / n);
                for (int i = 0; i < n; i++)
                    drawFit(p.getCanvas(), bm.get(i), W, 60, 60 + i * (boxH + 30f), W - 120f, boxH, false);
                pd.finishPage(p);
            } else {
                boolean full = "full".equals(c.getString("layout"));
                float mx = full ? 20f : 40f, my = full ? 24f : 60f;
                for (int i = 0; i < bm.size(); i++) {
                    PdfDocument.Page p = pd.startPage(new PdfDocument.PageInfo.Builder(W, H, i + 1).create());
                    drawFit(p.getCanvas(), bm.get(i), W, mx, my, W - 2 * mx, H - 2 * my, true);
                    pd.finishPage(p);
                }
            }
            File f = new File(outDir(), safe(c.getString("name")) + ".pdf");
            try (FileOutputStream fo = new FileOutputStream(f)) { pd.writeTo(fo); }
            pd.close();
            String pw = c.getString("password");
            if (pw != null && !pw.isEmpty()) protect(f, pw);
            if (Boolean.TRUE.equals(c.getBoolean("toFolder", false))) {
                DocumentFile t = tree();
                DocumentFile old = t.findFile(f.getName());
                if (old != null) old.delete();
                DocumentFile nf = t.createFile("application/pdf", f.getName());
                try (OutputStream os = getContext().getContentResolver().openOutputStream(nf.getUri());
                     java.io.FileInputStream in = new java.io.FileInputStream(f)) {
                    byte[] buf = new byte[8192];
                    int n;
                    while ((n = in.read(buf)) > 0) os.write(buf, 0, n);
                }
                f.delete();
            } else {
                launch(f, "application/pdf", c.getString("mode", "send"));
            }
            c.resolve();
        } catch (Exception e) { c.reject(String.valueOf(e)); }
    }

    @PluginMethod
    public void share(PluginCall c) {
        try {
            File f = new File(outDir(), safe(c.getString("name")) + ".jpg");
            try (FileOutputStream fo = new FileOutputStream(f)) {
                fo.write(Base64.decode(c.getString("data"), Base64.DEFAULT));
            }
            launch(f, c.getString("mime", "image/jpeg"), "send");
            c.resolve();
        } catch (Exception e) { c.reject(String.valueOf(e)); }
    }
}
