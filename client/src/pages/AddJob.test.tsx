import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { getMemoryRouter, queryClient } from '../utils/TestHelper';

// import { DashboardProvider } from '../context/DashboardProvider';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { DashboardContext } from '../context/DashboardContext';
import { mockUser } from '../utils/mocks';
import AddJob from './AddJob';

// Mock the 'react-router-dom' module to replace useNavigate
// vi.mock('../context/DashboardContext', async () => {
//   const actual = await vi.importActual('../context/DashboardContext');
//   return {
//     ...actual,
//     user: mockUser,
//   };
// });

// Mock the 'react-router-dom' module to replace useNavigate
// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom');
//   return {
//     ...actual,
//     useNavigate: () => vi.fn(), // Return our mock function
//     useLoaderData: vi.fn(() => mockUser),
//   };
// });

// Mock useQuery/useSuspenseQuery to return specific data
// vi.mock('@tanstack/react-query', async () => {
//   const actual = await vi.importActual('@tanstack/react-query');
//   return {
//     ...actual,
//     useQuery: vi.fn(() => ({
//       data: mockJobsResponse,
//       isLoading: false,
//       isError: false,
//     })),
//     useSuspenseQuery: vi.fn(() => ({
//       data: {
//         /* your mocked query data */
//       },
//     })),
//   };
// });

describe('Add Job Page', () => {
  it('should correctly render', async () => {
    const router = getMemoryRouter(['/dashboard'], <AddJob />);

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardContext.Provider
          value={{
            user: mockUser.user,
            showSidebar: true,
            isDarkTheme: false,
            toggleDarkTheme: () => {},
            toggleSidebar: () => {},
            logoutUser: () => {},
          }}
        >
          <RouterProvider router={router} />
        </DashboardContext.Provider>
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    screen.debug(undefined, Infinity);

    // Find heading by its text content
    const positionInput = screen.getByLabelText(/position/i);
    const companyInput = screen.getByLabelText(/company/i);
    const jobLocationInput = screen.getByLabelText(/job location/i);
    const jobStatusInput = screen.getByLabelText(/job status/i);
    const jobTypeInput = screen.getByLabelText(/job type/i);

    // Verify heading exists in document
    expect(positionInput).toBeInTheDocument();
    expect(companyInput).toBeInTheDocument();
    expect(jobLocationInput).toBeInTheDocument();
    expect(jobLocationInput).toHaveValue(mockUser.user.location);
    expect(jobStatusInput).toHaveValue(JOB_STATUS.PENDING);
    expect(jobTypeInput).toHaveValue(JOB_TYPE.FULL_TIME);
  });
});
