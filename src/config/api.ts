const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

// In local development, keep API requests relative so Vite can proxy them
// without browser CORS issues. Production still uses the configured API host.
const clientApiBaseUrl = import.meta.env.DEV ? "" : rawApiBaseUrl;

export const API_BASE_URL = clientApiBaseUrl
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/$/, "");
