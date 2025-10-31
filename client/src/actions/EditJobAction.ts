/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);

    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
