import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchEmployees, type GetEmployeesParams } from '../api/employeeApi';

/**
 * React Query hook for paginated employee data.
 * Uses `keepPreviousData` to avoid UI flashing while the next page is loading.
 */
export const useEmployees = (params: GetEmployeesParams) =>
  useQuery({
    queryKey: ['employees', params],
    queryFn: () => fetchEmployees(params),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });
