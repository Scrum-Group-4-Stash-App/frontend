const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const clientApiBaseUrl = import.meta.env.DEV ? "" : rawApiBaseUrl;

export const API_BASE_URL = clientApiBaseUrl
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/$/, "");
