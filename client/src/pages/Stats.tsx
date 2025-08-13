import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { statsQuery } from '../actions/StatsLoader.js';
import { ChartsContainer, StatsContainer } from '../components/index.js';

export default function Stats() {
  const initialData = useLoaderData();
  const { data } = useQuery({
    ...statsQuery,
    initialData,
  });

  return (
    <>
      <StatsContainer defaultStats={data.defaultStats} />
      {data.monthlyApplications?.length > 1 && <ChartsContainer data={data.monthlyApplications} />}
    </>
  );
}
