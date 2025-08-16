/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryClient } from '@tanstack/react-query';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const singleJobQuery = (id: string) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id ?? ''));
      return params.id;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-jobs');
    }
  };
