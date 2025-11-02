import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const file = formData.get('avatar') as File;
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }
  try {
    const editPromise = store.dispatch(jobifyApi.endpoints.editUser.initiate(formData));
    console.log('Profile updated', (await editPromise).data);
    toast.success('Profile updated successfully');
    return redirect('/dashboard');
  } catch {
    toast.error('Failed to edit user');
  }
};
