import { ChartsContainer, StatsContainer } from '../../components/index.js';
import { useGetStatsQuery } from '../../slices/jobifyApiSlice.js';

export default function Stats() {
  const { data, isLoading } = useGetStatsQuery();

  if (isLoading) {
    return <h5>Loading...</h5>;
  }

  const { defaultStats, monthlyApplications } = data as StatsResponse;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && <ChartsContainer data={monthlyApplications} />}
    </>
  );
}
