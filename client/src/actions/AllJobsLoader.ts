import { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';
import customFetch from '../utils/customFetch';

export const allJobsQuery = (params: { [k: string]: string }) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    if (Object.keys(params).length === 0) {
      params['search'] = '';
      params['jobStatus'] = 'all';
      params['jobType'] = 'all';
      params['sort'] = 'newest';
    }

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchParams: { ...params } };
  };
