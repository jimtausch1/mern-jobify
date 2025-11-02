/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    store.dispatch(jobifyApi.endpoints.addJob.initiate(data));
    toast.success('Job added successfully ');
    return redirect('/dashboard');
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
