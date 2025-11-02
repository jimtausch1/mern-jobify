import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const loader = async () => {
  const queryPromise = store.dispatch(jobifyApi.endpoints.getAdminStats.initiate());
  try {
    const response = await queryPromise.unwrap();
    return response;
  } catch {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  } finally {
    queryPromise.unsubscribe();
  }
};
