import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';

import { Provider } from 'react-redux';
import { loader as adminLoader } from '../actions/AdminLoader';
import { store } from '../store';
import { getMemoryRouter, mockAdminResponse } from '../utils';
import Admin from './Admin';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
    useLoaderData: vi.fn(() => mockAdminResponse),
  };
});

describe('Admin Page', () => {
  it('should correctly render', async () => {
    const router = getMemoryRouter(['/admin'], <Admin />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const searchInput = screen.getByText(/current users/i);
    const totalJobsFound = screen.getByText(/total jobs/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    expect(totalJobsFound).toBeInTheDocument();
  });

  test('adminLoader returns expected data', async () => {
    const data = await adminLoader();
    expect(data).toEqual({ mockAdminResponse });
  });
});
