import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { expect, it } from 'vitest';
import { getMemoryRouter, queryClient } from '../utils/TestHelper';
import Login from './Login';

import { toast } from 'react-toastify';

vi.mock('react-toastify'); // This tells Vitest to use the mock in __mocks__/react-toastify.js

describe('Login Page', () => {
  const router = getMemoryRouter(['/', '/dashboard'], <Login />);
  const user = userEvent.setup();

  beforeEach(() => {
    // Clear mock calls before each test to ensure isolation
    vi.clearAllMocks();
  });

  it('should correctly login with default user', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    // screen.debug();

    // Find heading by its text content
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    const exploreAppButton = screen.getByRole('button', { name: /explore/i });

    // Verify heading exists in document
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(exploreAppButton).toBeInTheDocument();

    await user.click(exploreAppButton);
    // const toastMessage = await screen.findByText(/take a test drive/i);
    expect(toast.success).toHaveBeenCalledTimes(1);
    // expect(toastMessage).toBeInTheDocument();
  });
});
