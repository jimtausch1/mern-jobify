import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';

import { Provider } from 'react-redux';
import { action as profileAction } from '../actions/ProfileAction';
import { store } from '../store';
import { getMemoryRouter, mockIdParams, mockRegisterUser, mockUser } from '../utils';
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

describe('Profile Page', () => {
  // const user = userEvent.setup();
  const url = 'http://localhost:5000/dashboard/profile';
  const request = { url: url } as Request;

  it('should correctly render', async () => {
    const router = getMemoryRouter(['/profile'], <Profile />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
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

  test('profileAction returns expected data', async () => {
    const mockFormData = new FormData();
    mockFormData.append('email', mockRegisterUser.email);
    mockFormData.append('lastName', mockRegisterUser.lastName);
    mockFormData.append('location', mockRegisterUser.location);
    mockFormData.append('name', mockRegisterUser.name);
    mockFormData.append('avatar', mockRegisterUser.name);
    request.formData = async () => mockFormData;

    const funcParam = { params: mockIdParams, request: request, context: {} };
    await profileAction(funcParam);
  });

  test('profileAction returns expected error', async () => {
    const mockFormData = new FormData();
    mockFormData.append('_id', '');
    mockFormData.append('email', 'error');
    mockFormData.append('lastName', mockRegisterUser.lastName);
    mockFormData.append('location', mockRegisterUser.location);
    mockFormData.append('name', mockRegisterUser.name);
    mockFormData.append('role', mockRegisterUser.name);
    mockFormData.append('avatar', '');
    request.formData = async () => mockFormData;

    const funcParam = { params: mockIdParams, request: request, context: {} };
    await profileAction(funcParam);
  });
});
