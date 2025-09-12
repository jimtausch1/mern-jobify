import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { getMemoryRouter, queryClient } from '../utils';

import userEvent from '@testing-library/user-event';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { loader as allJobsLoader } from '../actions/AllJobsLoader';
import { DashboardProvider } from '../context/DashboardProvider';
import { mockJobsResponse, mockSearchParams, mockSearchParamsTest } from '../utils';
import AllJobs from './AllJobs';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
    useLoaderData: vi.fn(() => mockSearchParams),
  };
});

// Mock useQuery/useSuspenseQuery to return specific data
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: mockJobsResponse,
      isLoading: false,
      isError: false,
    })),
    useSuspenseQuery: vi.fn(() => ({
      data: {
        /* your mocked query data */
      },
    })),
  };
});

describe('All Jobs Page', () => {
  const baseApiURL = 'http://localhost:5000/api/v1';
  const user = userEvent.setup();

  it('should correctly render', async () => {
    const router = getMemoryRouter(['/dashboard/all-jobs'], <AllJobs />);

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardProvider queryClient={queryClient}>
          <RouterProvider router={router} />
        </DashboardProvider>
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const searchInput = screen.getByLabelText(/search/i);
    const totalJobsFound = screen.getByText(/50 jobs found/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    expect(totalJobsFound).toBeInTheDocument();

    const nextPageButton = screen.getByText(/next/);
    const prevPageButton = screen.getByText(/prev/);

    expect(nextPageButton).toBeInTheDocument();
    expect(prevPageButton).toBeInTheDocument();

    await user.click(nextPageButton);
    await user.click(prevPageButton);
  });

  it('should correctly filter jobs', async () => {
    const router = getMemoryRouter(['/dashboard/all-jobs'], <AllJobs />);

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardProvider queryClient={queryClient}>
          <RouterProvider router={router} />
        </DashboardProvider>
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const searchInput = screen.getByLabelText(/search/i);
    const totalJobsFound = screen.getByText(/50 jobs found/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    expect(totalJobsFound).toBeInTheDocument();

    const jobStatusSelect = screen.getByLabelText(/job status/i);
    const jobTypeSelect = screen.getByLabelText(/job Type/i);
    const sortInputSelect = screen.getByLabelText(/sort/i);

    expect(jobStatusSelect).toBeInTheDocument();
    expect(jobTypeSelect).toBeInTheDocument();
    expect(sortInputSelect).toBeInTheDocument();

    await user.selectOptions(jobStatusSelect, JOB_STATUS.INTERVIEW);
    await user.selectOptions(jobTypeSelect, JOB_TYPE.INTERNSHIP);
    await user.selectOptions(sortInputSelect, JOB_SORT_BY.DESCENDING);
  });

  it('should correctly filter jobs by search', async () => {
    const router = getMemoryRouter(['/dashboard/all-jobs'], <AllJobs />);

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardProvider queryClient={queryClient}>
          <RouterProvider router={router} />
        </DashboardProvider>
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const searchInput = screen.getByLabelText(/search/i);
    const totalJobsFound = screen.getByText(/50 jobs found/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    expect(totalJobsFound).toBeInTheDocument();

    vi.useFakeTimers({ toFake: ['setTimeout'] });
    vi.advanceTimersByTimeAsync(5000);
    await user.type(searchInput, 'vp');
    vi.useRealTimers();
  });

  test('allJobsLoader returns expected data', async () => {
    const request = { url: 'http://localhost:5000/dashboard/all-jobs' } as Request;
    const funcParam = { params: mockSearchParams.searchParams, request: request, context: {} };
    const allJobsQueryFunction = allJobsLoader(queryClient);
    const data = await allJobsQueryFunction(funcParam);
    expect(data).toEqual(mockSearchParams);
  });

  test('allJobsLoader returns expected data with params', async () => {
    const url = `${baseApiURL}/jobs?search=vp&jobStatus=declined&jobType=part-time&sort=newest`;
    const request = { url: url } as Request;
    const funcParam = { params: mockSearchParamsTest.searchParams, request: request, context: {} };
    const allJobsQueryFunction = allJobsLoader(queryClient);
    const data = await allJobsQueryFunction(funcParam);
    expect(data).toEqual(mockSearchParamsTest);
  });
});
