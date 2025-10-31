import { Form, Link, useSubmit } from 'react-router-dom';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../../utils/constants';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { dashboardSlice } from '../../slices/dashboardSlice';
import { debounce } from '../../utils';

export default function SearchContainer() {
  const searchParams = useAppSelector((state) => state.dashboard.searchParams);
  const { search, jobStatus, jobType, sort } = searchParams;
  const dispatch = useAppDispatch();
  const submit = useSubmit();

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              dispatch(dashboardSlice.actions.loadJobStatus(e.currentTarget.value));
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              dispatch(dashboardSlice.actions.loadJobType(e.currentTarget.value));
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              dispatch(dashboardSlice.actions.loadSearch(e.currentTarget.value));
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
}
