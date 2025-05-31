import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Toko Mebel App",
        short_name: "Toko Mebel App",
        description: "Aplikasi toko mebel berbasis PWA",
        theme_color: "#135961",
        background_color: "#135961",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "192_toko_mebel.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512_toko_mebel.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://be-tokomebel.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
