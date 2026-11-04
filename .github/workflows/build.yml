name: Build Vault X APK
on:
  push:
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17
      - run: npm install
      - run: npx cap add android
      - name: Patch native project
        run: |
          D=android/app/src/main/java/com/vaultx/app
          mkdir -p $D && cp native/*.java $D/
          sed -i 's#</manifest>#<uses-permission android:name="android.permission.CAMERA"/></manifest>#' android/app/src/main/AndroidManifest.xml
          sed -i '/^dependencies {/a\    implementation "androidx.biometric:biometric:1.1.0"\n    implementation "androidx.documentfile:documentfile:1.0.1"\n    implementation "com.tom-roush:pdfbox-android:2.0.27.0"' android/app/build.gradle
      - run: npx cap sync android
      - run: cd android && chmod +x gradlew && ./gradlew assembleDebug
      - uses: actions/upload-artifact@v4
        with:
          name: VaultX-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
