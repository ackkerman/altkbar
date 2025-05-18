import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Moskeyto",
  version: "1.0.0",
  description: "A simple bookmark manager extention",
  permissions: [
    "storage", 
    "tabs", 
    "bookmarks"
  ],
  icons: {
    "16": "public/icon/icon16.png",
    "48": "public/icon/icon48.png",
    "128": "public/icon/icon128.png"
  },
  host_permissions: ["*://*/*"],
  action: {
    default_popup: "public/index.html",
  },
  background: { service_worker: "src/background/index.ts" },
  content_scripts: [
  ],
  commands: {
    _execute_action: {
      suggested_key: {
        default: "Alt+M",
      },
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
