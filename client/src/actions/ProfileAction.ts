/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const file = formData.get('avatar') as File;
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }
  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
    return redirect('/dashboard');
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
};
