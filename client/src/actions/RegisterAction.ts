import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const loginPromise = store.dispatch(jobifyApi.endpoints.registerUser.initiate(data));
    const response = await loginPromise.unwrap();
    toast.success(response.msg);
    return redirect('/login');
  } catch {
    toast.error('registration invalid');
  }
};
