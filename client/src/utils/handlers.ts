import { http, HttpResponse } from 'msw';
import {
  mockAdminResponse,
  mockEditJobResponse,
  mockJobsResponse,
  mockStatsResponse,
  mockUser,
} from './mocks';

export const handlers = [
  http.post('/api/v1/auth/login', () => {
    return HttpResponse.json({ msg: 'user logged in' });
  }),
  http.get('/api/v1/users/current-user', () => {
    return HttpResponse.json({
      mockUser,
    });
  }),
  http.get('/api/v1/jobs/stats', () => {
    return HttpResponse.json({ mockStatsResponse });
  }),
  http.get('/api/v1/jobs/:id', () => {
    return HttpResponse.json(mockEditJobResponse);
  }),
  http.get('/api/v1/jobs', () => {
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
