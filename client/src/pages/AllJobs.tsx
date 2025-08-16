import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { allJobsQuery } from '../actions/AllJobsLoader';
import { JobsContainer, SearchContainer } from '../components';
import { AllJobsProvider } from '../context/AllJobsProvider';

export default function AllJobs() {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));

  return (
    <AllJobsProvider data={data} searchValues={searchValues}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsProvider>
  );
}
