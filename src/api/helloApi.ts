import { apiClient } from './client';
import type { HelloResponse } from '../types';

/** Fetch greeting from the Spring Boot /api/hello endpoint */
export const fetchHello = async (): Promise<HelloResponse> => {
  const { data } = await apiClient.get<HelloResponse>('/hello');
  return data;
};
