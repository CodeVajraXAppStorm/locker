package com.vaultx.app;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

public class ExpiryReceiver extends BroadcastReceiver {
    static final String CH = "vaultx_expiry";
    static final String ACT = "vaultx.remind";

    @Override
    public void onReceive(Context ctx, Intent it) {
        String a = it.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(a)) {
            try {
                schedule(ctx, new JSONArray(ctx.getSharedPreferences("vaultx", 0).getString("reminders", "[]")));
            } catch (Exception e) { }
            return;
        }
        if (!ACT.equals(a)) return;
        String title = it.getStringExtra("t"), text = it.getStringExtra("x");
        if (title == null || text == null) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26)
            nm.createNotificationChannel(new NotificationChannel(CH, "Expiry reminders", NotificationManager.IMPORTANCE_DEFAULT));
        Intent open = ctx.getPackageManager().getLaunchIntentForPackage(ctx.getPackageName());
        PendingIntent pi = PendingIntent.getActivity(ctx, 0, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification pub = builder(ctx).setSmallIcon(android.R.drawable.ic_lock_idle_lock)
                .setContentTitle("Vault X").setContentText("Document reminder").build();
        Notification n = builder(ctx).setSmallIcon(android.R.drawable.ic_lock_idle_lock)
                .setContentTitle(title).setContentText(text).setContentIntent(pi).setAutoCancel(true)
                .setVisibility(Notification.VISIBILITY_PRIVATE).setPublicVersion(pub).build();
        nm.notify((title + text).hashCode(), n);
    }

    private static Notification.Builder builder(Context ctx) {
        return Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(ctx, CH) : new Notification.Builder(ctx);
    }

    static void schedule(Context ctx, JSONArray items) throws Exception {
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        long now = System.currentTimeMillis();
        for (int i = 0; i < items.length(); i++) {
            JSONObject o = items.getJSONObject(i);
            long at = o.getLong("time");
            if (at <= now) continue;
            Intent in = new Intent(ctx, ExpiryReceiver.class).setAction(ACT);
            in.putExtra("t", o.getString("title"));
            in.putExtra("x", o.getString("text"));
            PendingIntent pi = PendingIntent.getBroadcast(ctx, o.getString("key").hashCode(), in,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            if (Build.VERSION.SDK_INT >= 23) am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
            else am.set(AlarmManager.RTC_WAKEUP, at, pi);
        }
    }

    static void cancel(Context ctx, JSONArray items) {
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        for (int i = 0; i < items.length(); i++) {
            try {
                JSONObject o = items.getJSONObject(i);
                Intent in = new Intent(ctx, ExpiryReceiver.class).setAction(ACT);
                PendingIntent pi = PendingIntent.getBroadcast(ctx, o.getString("key").hashCode(), in,
                        PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE);
                if (pi != null) { am.cancel(pi); pi.cancel(); }
            } catch (Exception e) { }
        }
    }
}
