import { render, screen } from '@testing-library/react';
// Note: technically already available globally
import { expect, it } from 'vitest';
import App from './App';

describe('App Component', () => {
  // Test if heading renders correctly
  it('should render heading with correct text', () => {
    // Render the App component
    render(<App />);

    // Find heading by its text content
    const loginLink = screen.getByText('Login / Demo User');

    // Verify heading exists in document
    expect(loginLink).toBeInTheDocument();
  });
});
