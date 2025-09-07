import { http, HttpResponse } from 'msw';
import { mockJobsResponse, mockUser } from './mocks';

export const handlers = [
  http.post('/api/v1/auth/login', () => {
    return HttpResponse.json({ msg: 'user logged in' });
  }),
  http.get('/api/v1/users/current-user', () => {
    return HttpResponse.json({
      mockUser,
    });
  }),
  http.get('/api/v1/jobs', () => {
    return HttpResponse.json({
      mockJobsResponse,
    });
  }),
];
