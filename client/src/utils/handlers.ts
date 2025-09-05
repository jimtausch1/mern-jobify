import { http, HttpResponse } from 'msw';
import { mockUser } from './mocks';

export const handlers = [
  http.post('/api/v1/auth/login', () => {
    return HttpResponse.json({ msg: 'user logged in' });
  }),
  http.get('/api/v1/users/current-user', () => {
    return HttpResponse.json({
      mockUser,
    });
  }),
];
