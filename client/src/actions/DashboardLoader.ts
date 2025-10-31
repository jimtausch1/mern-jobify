import { dashboardSlice } from '../slices/dashboardSlice';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const loader = async () => {
  const queryPromise = store.dispatch(jobifyApi.endpoints.getCurrentUser.initiate());
  try {
    const response = await queryPromise.unwrap();
    const loadPromise = store.dispatch(dashboardSlice.actions.loadUser(response));
    return loadPromise.payload;
  } catch (error) {
    console.error('Failed to fetch jobs', error);
  } finally {
    queryPromise.unsubscribe();
  }
};
