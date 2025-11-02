/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id ?? '';
  const queryPromise = store.dispatch(jobifyApi.endpoints.getJob.initiate(id));
  try {
    const response = await queryPromise.unwrap();
    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard');
  } finally {
    queryPromise.unsubscribe();
  }
};
