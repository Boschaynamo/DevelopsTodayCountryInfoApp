import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
config();
const port = process.env.VITE_PORT;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  server: {
    port,
  },
  plugins: [react()],
});
