import { useQuery } from '@tanstack/react-query';
import { fetchHello } from '../api/helloApi';

/** React Query hook for the /api/hello endpoint */
export const useHello = () =>
  useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
    staleTime: 30_000,
  });
