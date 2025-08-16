/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

interface AllJobsContextValues {
  params: SearchParams;
  data: any;
}

export const AllJobsContext = createContext<AllJobsContextValues>({
  params: {
    search: '',
    jobStatus: '',
    jobType: '',
    sort: '',
    page: 1,
  },
  data: [],
});

export const useAllJobsContext = () => useContext(AllJobsContext);
