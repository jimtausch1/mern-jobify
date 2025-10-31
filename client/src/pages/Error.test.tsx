/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { RouterProvider, useRouteError } from 'react-router-dom';
import { expect, it, type Mock } from 'vitest';

// import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Error as ErrorPage } from '../pages';
import { store } from '../store';
import { getMemoryRouter } from '../utils';

// const profileAction = vi.fn(() => ({ message: 'update user' })); // Mock the action's return value

// vi.mock('../actions/ProfileAction', () => ({
//   action: profileAction,
// }));

// const mockError = new Error('Something went wrong!');

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(), // Mock the useRouteError hook
  };
});

describe('Error Page', () => {
  // const user = userEvent.setup();
  it('should correctly render error message', async () => {
    (useRouteError as Mock<any>).mockReturnValue(null);

    const router = getMemoryRouter(['/'], <ErrorPage />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const errorMessage = screen.getByText(/something went wrong/i);

    // Verify heading exists in document
    expect(errorMessage).toBeInTheDocument();

    // await user.click(submitButton);
  });

  it('should correctly render page not found', async () => {
    (useRouteError as Mock<any>).mockReturnValue(new Error('Something went wrong!'));

    const router = getMemoryRouter(['/'], <ErrorPage />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const errorMessage = screen.getByText(/page not found/i);

    // Verify heading exists in document
    expect(errorMessage).toBeInTheDocument();
  });
});
