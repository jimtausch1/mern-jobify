/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
