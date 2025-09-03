import { http, HttpResponse } from 'msw';

//  {"email":"test1@test.com","password":"secret123"}

export const handlers = [
  http.post('/api/v1/auth/login', () => {
    return HttpResponse.json({ msg: 'user logged in' });
  }),
];
