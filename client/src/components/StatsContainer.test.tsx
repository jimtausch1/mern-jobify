import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import StatsContainer from './StatsContainer';

describe('Stats Container', () => {
  const defaultStats: DefaultStats = {
    pending: 0,
    interview: 0,
    declined: 0,
  };

  it('should correctly render zeros', async () => {
    render(<StatsContainer defaultStats={defaultStats}></StatsContainer>);

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const pendingApplications = screen.getByText(/pending applications/i);
    const interviewsScheduled = screen.getByText(/interviews scheduled/i);
    const jobsDeclined = screen.getByText(/jobs declined/);

    // Verify heading exists in document
    expect(pendingApplications).toBeInTheDocument();
    expect(interviewsScheduled).toBeInTheDocument();
    expect(jobsDeclined).toBeInTheDocument();
  });
});
