import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';

import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../../utils/constants';
import { loader as allJobsLoader } from '../../actions/AllJobsLoader';
import { store } from '../../store';
import {
  getMemoryRouter,
  mockJobsResponse,
  mockSearchParams,
  mockSearchParamsTest,
} from '../../utils';
import AllJobs from './AllJobs';

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
    useLoaderData: vi.fn(() => mockSearchParams),
  };
});

describe('All Jobs Page', () => {
  const baseApiURL = 'http://localhost:5000/api/v1';
  const user = userEvent.setup();

  it('should correctly render', async () => {
    const router = getMemoryRouter(['/dashboard'], <AllJobs />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const searchInput = await screen.findByLabelText(/search/i);
    const totalJobsFound = await screen.findByText(/50 jobs found/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    expect(totalJobsFound).toBeInTheDocument();

    const nextPageButton = screen.getByText(/next/);
    const prevPageButton = screen.getByText(/prev/);

    expect(nextPageButton).toBeInTheDocument();
    expect(prevPageButton).toBeInTheDocument();

    await user.click(nextPageButton);
    await user.click(prevPageButton);
  });

  it('should correctly filter jobs', async () => {
    const router = getMemoryRouter(['/dashboard'], <AllJobs />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const searchInput = screen.getByLabelText(/search/i);
    // const totalJobsFound = screen.getByText(/50 jobs found/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    // expect(totalJobsFound).toBeInTheDocument();

    const jobStatusSelect = screen.getByLabelText(/job status/i);
    const jobTypeSelect = screen.getByLabelText(/job Type/i);
    const sortInputSelect = screen.getByLabelText(/sort/i);

    expect(jobStatusSelect).toBeInTheDocument();
    expect(jobTypeSelect).toBeInTheDocument();
    expect(sortInputSelect).toBeInTheDocument();

    await user.selectOptions(jobStatusSelect, JOB_STATUS.INTERVIEW);
    await user.selectOptions(jobTypeSelect, JOB_TYPE.INTERNSHIP);
    await user.selectOptions(sortInputSelect, JOB_SORT_BY.DESCENDING);
  });

  it('should correctly filter jobs by search', async () => {
    const router = getMemoryRouter(['/dashboard'], <AllJobs />);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const searchInput = screen.getByLabelText(/search/i);
    // const totalJobsFound = screen.getByText(/50 jobs found/);

    // Verify heading exists in document
    expect(searchInput).toBeInTheDocument();
    // expect(totalJobsFound).toBeInTheDocument();

    vi.useFakeTimers({ toFake: ['setTimeout'] });
    vi.advanceTimersByTimeAsync(5000);
    await user.type(searchInput, 'vp');
    vi.useRealTimers();
  });

  test('allJobsLoader returns expected data', async () => {
    const request = { url: 'http://localhost:5000/dashboard' } as Request;
    const funcParam = { params: mockSearchParams.searchParams, request: request, context: {} };
    const data = await allJobsLoader(funcParam);
    expect(data).toEqual(mockJobsResponse);
  });

  test('allJobsLoader returns expected data with params', async () => {
    const url = `${baseApiURL}/jobs?search=vp&jobStatus=declined&jobType=part-time&sort=newest`;
    const request = { url: url } as Request;
    const funcParam = { params: mockSearchParamsTest.searchParams, request: request, context: {} };
    const data = await allJobsLoader(funcParam);
    expect(data).toEqual(mockJobsResponse);
  });
});
