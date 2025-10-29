import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import userEvent from '@testing-library/user-event';
import { AllJobsContext } from '../context/AllJobsContext';
import { mockJobSearchParams, mockStatsResponse } from '../utils';
import PageBtnContainer from './PageBtnContainer';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => vi.fn(), // Return our mock function
    useNavigate: () => vi.fn(), // Return our mock function
    useLoaderData: vi.fn(() => mockStatsResponse),
  };
});

describe('PageBtn Container', () => {
  const user = userEvent.setup();

  it('should correctly render multiple pages', async () => {
    const data = { numOfPages: 5, currentPage: 4 };

    render(
      <AllJobsContext.Provider value={{ searchParams: mockJobSearchParams, data }}>
        <PageBtnContainer></PageBtnContainer>
      </AllJobsContext.Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const nextPageButton = screen.getByText(/next/);
    const prevPageButton = screen.getByText(/prev/);

    // Verify heading exists in document
    expect(nextPageButton).toBeInTheDocument();
    expect(prevPageButton).toBeInTheDocument();

    await user.click(nextPageButton);
    await user.click(prevPageButton);
    await user.click(nextPageButton);
  });

  it('should correctly render on last page', async () => {
    const data = { numOfPages: 5, currentPage: 5 };

    render(
      <AllJobsContext.Provider value={{ searchParams: mockJobSearchParams, data }}>
        <PageBtnContainer></PageBtnContainer>
      </AllJobsContext.Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const nextPageButton = screen.getByText(/next/);
    const prevPageButton = screen.getByText(/prev/);
    const pageFiveButton = screen.getByText(/5/);

    // Verify heading exists in document
    expect(nextPageButton).toBeInTheDocument();
    expect(prevPageButton).toBeInTheDocument();
    expect(pageFiveButton).toBeInTheDocument();

    await user.click(nextPageButton);
    await user.click(prevPageButton);
    await user.click(pageFiveButton);
    await user.click(nextPageButton);
  });
});
