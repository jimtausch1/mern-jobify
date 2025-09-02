import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';
import { getMemoryRouter } from '../utils/RouterHelper';
import Landing from './Landing';

describe('Landing Page', () => {
  const router = getMemoryRouter('/', <Landing />);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  it('should render heading with correct text', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    screen.debug();

    // Find heading by its text content
    const loginLink = screen.getByText('Login / Demo User');

    // Verify heading exists in document
    expect(loginLink).toBeInTheDocument();
  });
});
