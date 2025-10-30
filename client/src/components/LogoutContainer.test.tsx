import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { DashboardContext } from '../context/DashboardContext';
import { mockUser } from '../utils';
import LogoutContainer from './LogoutContainer';

describe('Logout Container', () => {
  it('should correctly render with no avatar', async () => {
    const testUser = { ...mockUser.user, avatar: '' };

    render(
      <DashboardContext.Provider
        value={{
          user: testUser,
          logoutUser: () => {},
        }}
      >
        <LogoutContainer></LogoutContainer>
      </DashboardContext.Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const logoutButton = screen.getByText(/logout/);

    // Verify heading exists in document
    expect(logoutButton).toBeInTheDocument();
  });
});
