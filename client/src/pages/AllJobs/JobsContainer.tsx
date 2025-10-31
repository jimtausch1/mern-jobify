import Wrapper from '../../assets/wrappers/JobsContainer';
import { useAppSelector } from '../../hooks';
import { useGetAllJobsQuery } from '../../slices/jobifyApiSlice';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';

export default function JobsContainer() {
  const searchParams = useAppSelector((state) => state.dashboard.searchParams);
  const { data, isLoading } = useGetAllJobsQuery(searchParams);

  if (isLoading) {
    return (
      <Wrapper>
        <h5>Loading...</h5>
      </Wrapper>
    );
  }

  const { jobs, totalJobs, numOfPages } = data as AllJobsResponse;

  if (jobs && jobs.length === 0) {
    return (
      <Wrapper>
        <h5>No jobs to display...</h5>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job: JobModel) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}
