import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { AllJobsContext } from '../context/AllJobsContext';
import { mockJobSearchParams, mockStatsResponse } from '../utils';
import JobsContainer from './JobsContainer';

// Define a variable to hold the mock location state
const mockNavigationState = 'idle';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => vi.fn(), // Return our mock function
    useNavigate: () => vi.fn(), // Return our mock function
    useNavigation: vi.fn(() => ({
      state: mockNavigationState, // Mocking the state to 'loading'
    })),
    useLoaderData: vi.fn(() => mockStatsResponse),
  };
});

describe('PageBtn Container', () => {
  it('should correctly render no data', async () => {
    const data = { jobs: [], numOfPages: 0, totalJobs: 0 };

    render(
      <AllJobsContext.Provider value={{ searchParams: mockJobSearchParams, data }}>
        <JobsContainer></JobsContainer>
      </AllJobsContext.Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const noJobsToDisplayText = screen.getByText(/No jobs to display.../i);

    // Verify heading exists in document
    expect(noJobsToDisplayText).toBeInTheDocument();
  });
});
