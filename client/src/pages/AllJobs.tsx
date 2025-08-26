import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { allJobsQuery } from '../actions/AllJobsLoader';
import { JobsContainer, SearchContainer } from '../components';
import { AllJobsProvider } from '../context/AllJobsProvider';

export default function AllJobs() {
  const { searchParams } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchParams));

  return (
    <AllJobsProvider data={data} searchParams={searchParams}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsProvider>
  );
}
