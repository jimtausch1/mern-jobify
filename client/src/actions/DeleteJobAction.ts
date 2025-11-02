import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const action = async ({ params }: ActionFunctionArgs) => {
  try {
    const id = params.id ?? '';
    store.dispatch(jobifyApi.endpoints.deleteJob.initiate(id));
    toast.success('Job deleted successfully');
  } catch {
    toast.error('Failed to delete job');
  }
  return redirect('/dashboard');
};
