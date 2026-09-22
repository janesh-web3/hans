import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Fixed, dedicated port so it never collides with /frontend (5173) or
    // unrelated projects' dev servers on this machine.
    port: 5190,
    strictPort: true,
  },
});
