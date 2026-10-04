import { apiClient } from './client';
import type { Page } from '../types';

export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  salary: number;
  startDate: string;
}

export interface GetEmployeesParams {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

/**
 * Fetch a paginated list of employees from the Spring Boot backend.
 */
export const fetchEmployees = async (
  params: GetEmployeesParams,
): Promise<Page<Employee>> => {
  const { data } = await apiClient.get<Page<Employee>>('/employees', {
    params,
  });
  return data;
};
