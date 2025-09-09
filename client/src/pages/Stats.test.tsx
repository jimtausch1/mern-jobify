import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { getMemoryRouter, queryClient } from '../utils/TestHelper';

import { loader as statsLoader } from '../actions/StatsLoader';
import { DashboardProvider } from '../context/DashboardProvider';
import { mockStatsResponse } from '../utils/mocks';
import Stats from './Stats';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
    useLoaderData: vi.fn(() => mockStatsResponse),
  };
});

// Mock useQuery/useSuspenseQuery to return specific data
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: mockStatsResponse,
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

window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

describe('Stats Page', () => {
  it('should correctly render', async () => {
    const router = getMemoryRouter(['/stats'], <Stats />);

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardProvider queryClient={queryClient}>
          <RouterProvider router={router} />
        </DashboardProvider>
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    screen.debug(undefined, Infinity);

    // Find heading by its text content
    const pendingApplications = screen.getByText(/pending applications/i);
    const interviewsScheduled = screen.getByText(/interviews scheduled/i);
    const jobsDeclined = screen.getByText(/jobs declined/);

    // Verify heading exists in document
    expect(pendingApplications).toBeInTheDocument();
    expect(interviewsScheduled).toBeInTheDocument();
    expect(jobsDeclined).toBeInTheDocument();
  });

  test('statsLoader returns expected data', async () => {
    const statsQueryFunction = statsLoader(queryClient);
    const data = await statsQueryFunction();
    expect(data).toEqual({ mockStatsResponse });
  });
});
