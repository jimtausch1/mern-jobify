import type { QueryClient } from '@tanstack/react-query';
import customFetch from '../utils/customFetch';

export const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};
