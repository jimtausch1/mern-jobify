/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllJobsContext } from './AllJobsContext';

interface AllJobsProviderProps {
  children: React.ReactNode | string;
  data: any;
  searchValues: SearchParams;
}
export function AllJobsProvider({ children, data, searchValues }: AllJobsProviderProps) {
  // const { search, jobStatus, jobType, sort, page } = searchValues;

  return (
    <AllJobsContext.Provider value={{ params: searchValues, data }}>
      {children}
    </AllJobsContext.Provider>
  );
}
