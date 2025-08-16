/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryClient } from '@tanstack/react-query';
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job added successfully ');
      return redirect('all-jobs');
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
