import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiBaseUrl = env.VITE_API_BASE_URL || "";
  const apiProxyTarget = apiBaseUrl ? new URL(apiBaseUrl).origin : "";

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ...(apiBaseUrl
      ? {
          server: {
            proxy: {
              "/api/v1": {
                target: apiProxyTarget,
                changeOrigin: true,
                headers: {
                  Origin: apiProxyTarget,
                },
                secure: true,
              },
            },
          },
        }
      : {}),
  };
});
