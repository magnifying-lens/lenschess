import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/graphql": {
  //       target: "http://localhost:3001",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/graphql/, ""),
  //     },
  //   },
  // },
  plugins: [react()],
});
