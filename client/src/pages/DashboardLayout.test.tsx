import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { getMemoryRouter, queryClient } from '../utils/TestHelper';

import userEvent from '@testing-library/user-event';
import { loader as dashboardLoader } from '../actions/DashboardLoader';
import { DashboardProvider } from '../context/DashboardProvider';
import { mockUser } from '../utils/mocks';
import DashboardLayout from './DashboardLayout';

// Define a variable to hold the mock location state
let mockNavigationState = 'idle';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
    useNavigation: vi.fn(() => ({
      state: mockNavigationState, // Mocking the state to 'loading'
    })),
    useLoaderData: vi.fn(() => mockUser),
  };
});

// Mock useQuery/useSuspenseQuery to return specific data
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: mockUser,
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

describe('Dashboard Layout Page', () => {
  const user = userEvent.setup();
  it('should correctly render', async () => {
    const router = getMemoryRouter(
      ['/', '/dashboard'],
      <DashboardLayout queryClient={queryClient} />
    );

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
    const addJobLink = screen.getAllByText(/add job/i);
    const allJobsLink = screen.getAllByText(/all jobs/i);
    const statsLink = screen.getAllByText(/stats/i);
    const profileLink = screen.getAllByText(/profile/i);

    // Verify heading exists in document
    expect(addJobLink[0]).toBeInTheDocument();
    expect(allJobsLink[0]).toBeInTheDocument();
    expect(statsLink[0]).toBeInTheDocument();
    expect(profileLink[0]).toBeInTheDocument();

    const userButton = screen.getByText(/john/i);
    expect(userButton).toBeInTheDocument();
    await user.click(userButton);

    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
    await user.click(logoutButton);

    const darkThemeButton = screen.getByTestId('moon-fill');
    expect(darkThemeButton).toBeInTheDocument();
    await user.click(darkThemeButton);

    const lightThemeButton = screen.getByTestId('sun-fill');
    expect(lightThemeButton).toBeInTheDocument();
    await user.click(lightThemeButton);

    const toggleSideBar = screen.getByTestId('toggle-sidebar');
    expect(toggleSideBar).toBeInTheDocument();
    await user.click(toggleSideBar);
    await user.click(toggleSideBar);
  });

  it('should correctly render while loading', async () => {
    mockNavigationState = 'loading';

    const router = getMemoryRouter(
      ['/', '/dashboard'],
      <DashboardLayout queryClient={queryClient} />
    );

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
    const addJobLink = screen.getAllByText(/add job/i);
    const allJobsLink = screen.getAllByText(/all jobs/i);
    const statsLink = screen.getAllByText(/stats/i);
    const profileLink = screen.getAllByText(/profile/i);

    // Verify heading exists in document
    expect(addJobLink[0]).toBeInTheDocument();
    expect(allJobsLink[0]).toBeInTheDocument();
    expect(statsLink[0]).toBeInTheDocument();
    expect(profileLink[0]).toBeInTheDocument();
  });

  test('dashboardLoader returns expected data', async () => {
    const userQueryFunction = dashboardLoader(queryClient);
    const data = await userQueryFunction();
    expect(data).toEqual(mockUser);
  });
});
