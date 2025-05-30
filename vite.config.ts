import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  root: "src",
  publicDir: "../public",
  server: {
    port: 3000,
    open: "/",
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/index.html",
        browse: "src/browse.html",
        single: "src/single.html",
        404: "src/404.html",
        about: "src/about.html",
        contact: "src/contact.html",
        privacy: "src/privacy.html",
        rtl: "src/rtl.html",
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
});
