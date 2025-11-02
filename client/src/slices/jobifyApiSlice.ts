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
  tagTypes: ['User', 'Jobs'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserModel, void>({
      query: () => `users/current-user`,
      providesTags: ['User'],
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `users/update-user`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logoutUser: builder.query<UserModel, void>({
      query: () => `auth/logout`,
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    getAllJobs: builder.query<AllJobsResponse, SearchParams>({
      query: (params: SearchParams) =>
        `jobs?search=${params.search}&jobStatus=${params.jobStatus}&jobType=${params.jobType}&sort=${params.sort}`,
      providesTags: ['Jobs'],
    }),
    getStats: builder.query<StatsResponse, void>({
      query: () => `jobs/stats`,
    }),
    getAdminStats: builder.query<AdminStatsResponse, void>({
      query: () => `users/admin/app-stats`,
    }),
    getJob: builder.query<JobModel, string>({
      query: (id: string) => `jobs/${id}`,
    }),
    editJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `jobs/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Jobs'],
    }),
    deleteJob: builder.mutation({
      query: (id: string) => ({
        url: `jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Jobs'],
    }),
    addJob: builder.mutation({
      query: (newJob) => ({
        url: 'jobs',
        method: 'POST',
        body: newJob,
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllJobsQuery, useGetCurrentUserQuery, useGetStatsQuery, useAddJobMutation } =
  jobifyApi;
