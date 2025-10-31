/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';

export const loader = async (id: string) => {
  try {
    const { data } = await customFetch.get(`/jobs/${id}`);
    return data;
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};
