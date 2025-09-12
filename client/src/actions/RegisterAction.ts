/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};
