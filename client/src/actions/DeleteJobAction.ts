/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryClient } from '@tanstack/react-query';
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });

      toast.success('Job deleted successfully');
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard/all-jobs');
  };
