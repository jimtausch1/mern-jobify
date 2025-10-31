import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { expect, it } from 'vitest';
import { action as loginAction } from '../actions/LoginAction';
import Login from './Login';

import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import { store } from '../store';
import { getMemoryRouter, mockIdParams, mockUser } from '../utils';

vi.mock('react-toastify'); // This tells Vitest to use the mock in __mocks__/react-toastify.js

describe('Login Page', () => {
  const router = getMemoryRouter(['/', '/dashboard'], <Login />);
  const url = 'http://localhost:5000/login';
  const request = { url: url } as Request;
  const user = userEvent.setup();

  it('should correctly login with default user', async () => {
    render(
      <Provider store={store}>
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </Provider>
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
    expect(toast.success).toHaveBeenCalledTimes(1);
  });

  test('loginAction returns expected data', async () => {
    const mockFormData = new FormData();
    mockFormData.append('email', mockUser.user.email);
    mockFormData.append('password', '');
    request.formData = async () => mockFormData;

    const funcParam = { params: mockIdParams, request: request, context: {} };
    await loginAction(funcParam);
  });

  test('loginAction returns expected data', async () => {
    const mockFormData = new FormData();
    mockFormData.append('email', 'error');
    mockFormData.append('password', '');
    request.formData = async () => mockFormData;

    const funcParam = { params: mockIdParams, request: request, context: {} };
    await loginAction(funcParam);
  });
});
