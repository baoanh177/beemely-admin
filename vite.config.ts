import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
