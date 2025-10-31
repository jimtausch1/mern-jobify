import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { Provider } from 'react-redux';
import { store } from '../store';
import LogoutContainer from './LogoutContainer';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => vi.fn(), // Return our mock function
    useNavigate: () => vi.fn(), // Return our mock function
  };
});

describe('Logout Container', () => {
  it('should correctly render with no avatar', async () => {
    render(
      <Provider store={store}>
        <LogoutContainer></LogoutContainer>
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const logoutButton = screen.getByText(/logout/);

    // Verify heading exists in document
    expect(logoutButton).toBeInTheDocument();
  });
});
