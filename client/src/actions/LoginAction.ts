/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/login', data);
      queryClient.invalidateQueries();
      console.log('form data', data);
      toast.success('Login successful');
      return redirect('/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
