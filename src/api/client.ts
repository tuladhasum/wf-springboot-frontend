import axios from 'axios';

const getBaseUrl = () => {
  // @ts-ignore
  if (window._env_ && window._env_.BACKEND_API_URL) {
    // @ts-ignore
    return window._env_.BACKEND_API_URL;
  }
  return import.meta.env.VITE_API_BASE_URL ?? '/api';
};

/**
 * Central Axios instance.
 */
export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
});

// ── Request interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
