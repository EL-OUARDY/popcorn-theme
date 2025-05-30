import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: "/index.html",
        browse: "/browse.html",
        single: "/single.html",
        404: "/404.html",
        about: "/about.html",
        contact: "/contact.html",
        privacy: "/privacy.html",
        rtl: "/rtl.html",
      },
    },
  },
});
