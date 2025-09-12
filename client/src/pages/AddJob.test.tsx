import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';

import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { action as addJobAction } from '../actions/AddJobAction';
import { singleJobQuery } from '../actions/EditJobLoader';
import { DashboardContext } from '../context/DashboardContext';
import {
  getMemoryRouter,
  mockEditJobParams,
  mockEditJobResponse,
  mockUser,
  queryClient,
} from '../utils';
import AddJob from './AddJob';

describe('Add Job Page', () => {
  const url = 'http://localhost:5000/api/v1/jobs';
  const request = { url: url } as Request;

  it('should correctly render', async () => {
    const router = getMemoryRouter(['/dashboard'], <AddJob />);

    render(
      <QueryClientProvider client={queryClient}>
        <DashboardContext.Provider
          value={{
            user: mockUser.user,
            showSidebar: true,
            isDarkTheme: false,
            toggleDarkTheme: () => {},
            toggleSidebar: () => {},
            logoutUser: () => {},
          }}
        >
          <RouterProvider router={router} />
        </DashboardContext.Provider>
      </QueryClientProvider>
    );

    // Log the DOM tree for debugging
    screen.debug(undefined, Infinity);

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
    expect(jobLocationInput).toHaveValue(mockUser.user.location);
    expect(jobStatusInput).toHaveValue(JOB_STATUS.PENDING);
    expect(jobTypeInput).toHaveValue(JOB_TYPE.FULL_TIME);
  });

  test('addJobAction returns expected data', async () => {
    const editJobActionFunction = addJobAction(queryClient);

    const mockFormData = new FormData();
    mockFormData.append('company', mockEditJobResponse.job.company);
    mockFormData.append('position', mockEditJobResponse.job.position);
    mockFormData.append('jobLocation', mockEditJobResponse.job.jobLocation);
    mockFormData.append('jobStatus', mockEditJobResponse.job.jobStatus);
    mockFormData.append('jobType', mockEditJobResponse.job.jobType);
    request.formData = async () => mockFormData;

    const funcParam = { params: mockEditJobParams, request: request, context: {} };
    await editJobActionFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });

  test('addJobAction returns expected error', async () => {
    const editJobActionFunction = addJobAction(queryClient);

    const mockFormData = new FormData();
    mockFormData.append('company', 'error');
    mockFormData.append('position', mockEditJobResponse.job.position);
    mockFormData.append('jobLocation', mockEditJobResponse.job.jobLocation);
    mockFormData.append('jobStatus', mockEditJobResponse.job.jobStatus);
    mockFormData.append('jobType', mockEditJobResponse.job.jobType);
    request.formData = async () => mockFormData;

    const funcParam = { params: mockEditJobParams, request: request, context: {} };
    await editJobActionFunction(funcParam);
    const data = await queryClient.ensureQueryData(singleJobQuery(mockEditJobParams.id));
    expect(data).toEqual(mockEditJobResponse);
  });
});
