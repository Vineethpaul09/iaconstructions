import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Prerender only in production builds (not needed for dev server)
    ...(isProduction
      ? [
          (await import("@prerenderer/rollup-plugin")).default({
            renderer: (await import("@prerenderer/renderer-puppeteer")).default,
            rendererOptions: {
              headless: true,
              renderAfterDocumentEvent: "render-event",
            },
            routes: [
              "/",
              "/projects",
              "/services",
              "/about",
              "/contact",
              "/client-stories",
              "/properties",
              "/privacy",
              "/terms",
              "/rera",
            ],
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
