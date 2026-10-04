// ─── Domain types ────────────────────────────────────────────────────────────

/** Generic paginated API response wrapper */
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

/** Example entity returned by the Spring Boot backend */
export interface HelloResponse {
  message: string;
  timestamp: string;
}

/** Generic API error shape */
export interface ApiError {
  status: number;
  message: string;
  timestamp: string;
}
