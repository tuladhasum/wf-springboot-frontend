import axios from 'axios';

/**
 * Central Axios instance.
 *
 * Base URL is read from:
 *   1. VITE_API_BASE_URL env var (set at build time or in .env.local)
 *   2. The BACKEND_API_URL env var injected by the Helm chart at runtime
 *      (only available when running inside Kubernetes)
 *   3. Falls back to the Vite dev-proxy path "/api"
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
});

// ── Request interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  // Add auth token here when implemented
  // const token = getAuthToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralised error handling (logging, toast notifications, etc.)
    return Promise.reject(error);
  },
);
