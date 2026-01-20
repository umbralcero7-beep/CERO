import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.umbral.app',
  appName: 'Umbral',
  webDir: 'public', // Using 'public' as it exists. The app will load the remote URL.
  server: {
    url: 'https://cero-83hm.vercel.app',
    cleartext: true
  }
};

export default config;
