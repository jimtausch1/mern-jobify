import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    const id = params.id;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    store.dispatch(jobifyApi.endpoints.editJob.initiate({ id, data }));
    toast.success('Job edited successfully ');
    return redirect('/dashboard');
  } catch {
    toast.error('Failed to edit job');
  }
};
