import { http, HttpResponse } from 'msw';
import {
  mockAdminResponse,
  mockEditJobResponse,
  mockJobsResponse,
  mockStatsResponse,
  mockUser,
} from './mocks';

export const handlers = [
  http.post('/api/v1/auth/register', async ({ request }) => {
    const data = (await request.json()) as LoginRequest;

    if (data.email === 'error') {
      throw new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }
    return HttpResponse.json({ msg: 'Registration successful' });
  }),
  http.post('/api/v1/auth/login', async ({ request }) => {
    const data = (await request.json()) as LoginRequest;

    if (data.email === 'error') {
      throw new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }

    return HttpResponse.json({ msg: 'user logged in' });
  }),
  http.get('/api/v1/users/current-user', () => {
    return HttpResponse.json(mockUser);
  }),
  http.patch('/api/v1/users/update-user', () => {
    return HttpResponse.json(mockUser);
  }),
  http.get('/api/v1/jobs/stats', () => {
    return HttpResponse.json({ mockStatsResponse });
  }),
  http.get('/api/v1/jobs/:id', ({ params }) => {
    if (params.id === 'error') {
      throw new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }

    return HttpResponse.json(mockEditJobResponse);
  }),
  http.patch('/api/v1/jobs/:id', ({ params }) => {
    if (params.id === 'error') {
      throw new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }

    return HttpResponse.json(mockEditJobResponse);
  }),
  http.delete('/api/v1/jobs/:id', ({ params }) => {
    if (params.id === 'error') {
      throw new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }

    return HttpResponse.json(mockEditJobResponse);
  }),
  http.get('/api/v1/jobs', () => {
    return HttpResponse.json({
      mockJobsResponse,
    });
  }),
  http.post('/api/v1/jobs', async ({ request }) => {
    const data = (await request.json()) as JobModel;

    if (data.company === 'error') {
      throw new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }

    return HttpResponse.json({
      mockJobsResponse,
    });
  }),
  http.get('/api/v1/users/admin/app-stats', () => {
    return HttpResponse.json({ mockAdminResponse });
  }),
  http.post('/api/v1/users/update-user', () => {
    return HttpResponse.json({ msg: 'update user' });
  }),
];
