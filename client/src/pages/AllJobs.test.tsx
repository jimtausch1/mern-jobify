import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { getMemoryRouter, queryClient } from '../utils/TestHelper';

import { loader as allJobsLoader } from '../actions/AllJobsLoader';
import { DashboardProvider } from '../context/DashboardProvider';
import { mockJobsResponse, mockSearchParams } from '../utils/mocks';
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
    const totalJobsFound = screen.getByText(/15 jobs found/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    expect(totalJobsFound).toBeInTheDocument();
  });

  test('allJobsLoader returns expected data', async () => {
    const allJobsQueryFunction = allJobsLoader(queryClient);
    const params = Object.fromEntries([[mockSearchParams]]);
    if (Object.keys(params).length === 0) {
      params['search'] = '';
      params['jobStatus'] = 'all';
      params['jobType'] = 'all';
      params['sort'] = 'newest';
    }

    const request = { url: 'http://localhost:5000/dashboard/all-jobs' } as Request;
    const funcParam = { params: params, request: request, context: {} };
    const data = await allJobsQueryFunction(funcParam);
    expect(data).toEqual(mockSearchParams);
  });
});
