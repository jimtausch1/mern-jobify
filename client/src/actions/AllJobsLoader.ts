import type { LoaderFunctionArgs } from 'react-router-dom';
import { jobifyApi } from '../slices/jobifyApiSlice';
import { store } from '../store';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  if (Object.keys(params).length === 0) {
    params['search'] = '';
    params['jobStatus'] = 'all';
    params['jobType'] = 'all';
    params['sort'] = 'newest';
  }

  const searchParams = store.getState().dashboard.searchParams;
  const queryPromise = store.dispatch(jobifyApi.endpoints.getAllJobs.initiate(searchParams));
  try {
    const response = await queryPromise.unwrap();
    console.log('Loader loading data');
    return response;
  } catch (error) {
    console.error('Failed to fetch jobs', error);
  } finally {
    queryPromise.unsubscribe();
  }
};
