// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const jobifyApi = createApi({
  reducerPath: 'jobifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/',
    mode: 'cors',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserModel, void>({
      query: () => `users/current-user`,
    }),
    getAllJobs: builder.query<AllJobsResponse, SearchParams>({
      query: (params: SearchParams) =>
        `jobs?search=${params.search}&jobStatus=${params.jobStatus}&jobType=${params.jobType}&sort=${params.sort}`,
    }),
    getStats: builder.query<StatsResponse, void>({
      query: () => `jobs/stats`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllJobsQuery, useGetCurrentUserQuery, useGetStatsQuery } = jobifyApi;
