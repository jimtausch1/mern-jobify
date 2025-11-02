import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const loginPromise = store.dispatch(jobifyApi.endpoints.loginUser.initiate(data));
    const response = await loginPromise.unwrap();
    toast.success(response.msg);
    return redirect('/dashboard');
  } catch {
    toast.error('authentication invalid');
  }
};
