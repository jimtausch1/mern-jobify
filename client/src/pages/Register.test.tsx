import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { expect, it } from 'vitest';
import { action as registerAction } from '../actions/RegisterAction';

import { getMemoryRouter, mockRegisterUser, queryClient } from '../utils';
import Register from './Register';

describe('Register Page', () => {
  const router = getMemoryRouter(['/', '/dashboard'], <Register />);
  const url = 'http://localhost:5000/register';
  const request = { url: url } as Request;

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
    const nameInput = screen.getByRole('textbox', { name: /^name$/ });
    const lastNameInput = screen.getByLabelText(/last name/i);
    const locationInput = screen.getByRole('textbox', { name: /location/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Verify heading exists in document
    expect(nameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('registerAction returns expected data', async () => {
    const mockFormData = new FormData();
    mockFormData.append('email', mockRegisterUser.email);
    mockFormData.append('lastName', mockRegisterUser.lastName);
    mockFormData.append('location', mockRegisterUser.location);
    mockFormData.append('name', mockRegisterUser.name);
    mockFormData.append('password', mockRegisterUser.password);
    request.formData = async () => mockFormData;

    await registerAction({ request });
  });

  test('registerAction returns expected error', async () => {
    const mockFormData = new FormData();
    mockFormData.append('email', 'error');
    mockFormData.append('lastName', mockRegisterUser.lastName);
    mockFormData.append('location', mockRegisterUser.location);
    mockFormData.append('name', mockRegisterUser.name);
    mockFormData.append('password', mockRegisterUser.password);
    request.formData = async () => mockFormData;

    await registerAction({ request });
  });
});
