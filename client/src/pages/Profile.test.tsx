import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { getMemoryRouter, queryClient } from '../utils/TestHelper';

import { DashboardContext } from '../context/DashboardContext';
import { mockUser } from '../utils/mocks';
import Profile from './Profile';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
    useLoaderData: vi.fn(() => mockUser),
    useActionData: () => ({ message: 'update user' }),
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

describe('Profile Page', () => {
  // const user = userEvent.setup();
  it('should correctly render', async () => {
    const router = getMemoryRouter(['/profile'], <Profile />);

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
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const nameInput = screen.getByLabelText('name', { exact: true });
    const lastnameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/);
    const locationInput = screen.getByLabelText(/location/);
    const submitButton = screen.getByText(/submit/i);

    // Verify heading exists in document
    expect(nameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
