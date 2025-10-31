import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { store } from '../store';
import { getMemoryRouter } from '../utils';
import Landing from './Landing';

describe('Landing Page', () => {
  const router = getMemoryRouter(['/'], <Landing />);

  it('should render heading with correct text', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug();

    // Find heading by its text content
    const loginLink = screen.getByRole('link', { name: /login/i });
    const registerLink = screen.getByRole('link', { name: /register/i });

    // Verify heading exists in document
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });
});
