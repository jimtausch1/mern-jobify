import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';

import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { loader as statsLoader } from '../../actions/StatsLoader';
import { store } from '../../store';
import { getMemoryRouter, mockStatsResponse } from '../../utils';
import Stats from './Stats';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
  };
});

window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

describe('Stats Page', () => {
  const user = userEvent.setup();
  it('should correctly render', async () => {
    const router = getMemoryRouter(['/stats'], <Stats />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const pendingApplications = await screen.findByText(/pending applications/i);
    const interviewsScheduled = screen.getByText(/interviews scheduled/i);
    const jobsDeclined = screen.getByText(/jobs declined/);

    // Verify heading exists in document
    expect(pendingApplications).toBeInTheDocument();
    expect(interviewsScheduled).toBeInTheDocument();
    expect(jobsDeclined).toBeInTheDocument();

    const areaChartButton = screen.getByText(/area chart/i);
    expect(areaChartButton).toBeInTheDocument();
    await user.click(areaChartButton);

    const barChartButton = screen.getByText(/bar chart/i);
    expect(barChartButton).toBeInTheDocument();
  });

  test('statsLoader returns expected data', async () => {
    const data = await statsLoader();
    expect(data).toEqual(mockStatsResponse);
  });
});
