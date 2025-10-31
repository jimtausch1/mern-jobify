import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { expect, it } from 'vitest';

import { Provider } from 'react-redux';
// import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { action as deleteJobAction } from '../actions/DeleteJobAction';
import { action as editJobAction } from '../actions/EditJobAction';
import { loader as editJobLoader } from '../actions/EditJobLoader';
import { store } from '../store';
import { getMemoryRouter, mockEditJobResponse } from '../utils';
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Log the DOM tree for debugging
    // screen.debug(undefined, Infinity);

    // Find heading by its text content
    const positionInput = screen.getByLabelText(/position/i);
    const companyInput = screen.getByLabelText(/company/i);
    const jobLocationInput = screen.getByLabelText(/job location/i);
    // const jobStatusInput = screen.getByLabelText(/job status/i);
    // const jobTypeInput = screen.getByLabelText(/job type/i);

    // Verify heading exists in document
    expect(positionInput).toBeInTheDocument();
    expect(companyInput).toBeInTheDocument();
    expect(jobLocationInput).toBeInTheDocument();
    // expect(jobStatusInput).toHaveValue(JOB_STATUS.DECLINED);
    // expect(jobTypeInput).toHaveValue(JOB_TYPE.PART_TIME);
  });

  test('editJobLoader returns expected data', async () => {
    await editJobLoader(mockEditJobParams.id);
  });

  test('editJobLoader returns expected error', async () => {
    await editJobLoader('error');
  });

  test('editJobAction returns expected data', async () => {
    const funcParam = { params: mockEditJobParams, request: request, context: {} };
    await editJobAction(funcParam);
  });

  test('editJobAction returns expected error', async () => {
    const funcParam = { params: { id: 'error' }, request: request, context: {} };
    await editJobAction(funcParam);
  });

  test('deleteJobAction returns expected data', async () => {
    const funcParam = { params: mockEditJobParams, request: request, context: {} };
    await deleteJobAction(funcParam);
  });

  test('deleteJobAction returns expected error', async () => {
    const funcParam = { params: { id: 'error' }, request: request, context: {} };
    await deleteJobAction(funcParam);
  });
});
