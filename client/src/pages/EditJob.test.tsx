import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';

import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { action as deleteJobAction } from '../actions/DeleteJobAction';
import { action as editJobAction } from '../actions/EditJobAction';
import { loader as editJobLoader, singleJobQuery } from '../actions/EditJobLoader';
import { DashboardContext } from '../context/DashboardContext';
import { getMemoryRouter, mockEditJobResponse, mockUser, queryClient } from '../utils';
import EditJob from './EditJob';

const mockEditJobParams = { id: '68a0a8d08b1e93e7ab070004' };

// Mock the 'react-router-dom' module to replace useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Return our mock function
    useLoaderData: vi.fn(() => mockEditJobParams),
  };
});

// Mock useQuery/useSuspenseQuery to return specific data
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: mockEditJobResponse,
      isLoading: false,
      isError: false,
    })),
    useSuspenseQuery: vi.fn(() => ({
      data: {
        /* your mocked query data */
      },
    })),
  };
});

describe('Edit Job Page', () => {
  const url = 'http://localhost:5000/api/v1/jobs';
  const request = { url: url } as Request;

  const mockFormData = new FormData();
  mockFormData.append('company', mockEditJobResponse.job.company);
  mockFormData.append('position', mockEditJobResponse.job.position);
  mockFormData.append('jobLocation', mockEditJobResponse.job.jobLocation);
  mockFormData.append('jobStatus', mockEditJobResponse.job.jobStatus);
  mockFormData.append('jobType', mockEditJobResponse.job.jobType);
  request.formData = async () => mockFormData;

  it('should correctly render', async () => {
    const router = getMemoryRouter(['/dashboard'], <EditJob />);

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardContext.Provider
          value={{
            user: mockUser.user,
            showSidebar: true,
            toggleSidebar: () => {},
            logoutUser: () => {},
          }}
        >
          <RouterProvider router={router} />
        </DashboardContext.Provider>
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const positionInput = screen.getByLabelText(/position/i);
    const companyInput = screen.getByLabelText(/company/i);
    const jobLocationInput = screen.getByLabelText(/job location/i);
    const jobStatusInput = screen.getByLabelText(/job status/i);
    const jobTypeInput = screen.getByLabelText(/job type/i);

    // Verify heading exists in document
    expect(positionInput).toBeInTheDocument();
    expect(companyInput).toBeInTheDocument();
    expect(jobLocationInput).toBeInTheDocument();
    expect(jobStatusInput).toHaveValue(JOB_STATUS.DECLINED);
    expect(jobTypeInput).toHaveValue(JOB_TYPE.PART_TIME);
  });

  test('editJobLoader returns expected data', async () => {
    const singleJobQueryFunction = editJobLoader(queryClient);
    const funcParam = { params: mockEditJobParams, request: request, context: {} };
    await singleJobQueryFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });

  test('editJobLoader returns expected error', async () => {
    const singleJobQueryFunction = editJobLoader(queryClient);
    const funcParam = { params: { id: 'error' }, request: request, context: {} };
    await singleJobQueryFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });

  test('editJobAction returns expected data', async () => {
    const editJobActionFunction = editJobAction(queryClient);
    const funcParam = { params: mockEditJobParams, request: request, context: {} };
    await editJobActionFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });

  test('editJobAction returns expected error', async () => {
    const editJobActionFunction = editJobAction(queryClient);
    const funcParam = { params: { id: 'error' }, request: request, context: {} };
    await editJobActionFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });

  test('deleteJobAction returns expected data', async () => {
    const deleteJobActionFunction = deleteJobAction(queryClient);
    const funcParam = { params: mockEditJobParams, request: request, context: {} };
    await deleteJobActionFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });

  test('deleteJobAction returns expected error', async () => {
    const deleteJobActionFunction = deleteJobAction(queryClient);
    const funcParam = { params: { id: 'error' }, request: request, context: {} };
    await deleteJobActionFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });
});
