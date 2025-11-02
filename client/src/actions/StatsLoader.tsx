import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const loader = async () => {
  const queryPromise = store.dispatch(jobifyApi.endpoints.getStats.initiate());
  try {
    const response = await queryPromise.unwrap();
    return response;
  } catch (error) {
    console.error('Failed to fetch stats', error);
  } finally {
    queryPromise.unsubscribe();
  }
};
