import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import { server } from './utils';

expect.extend(matchers);

// the following is used for debugging msw handlers
server.events.on('request:start', ({ request }) => {
  console.log('Outgoing', request.method, request.url);
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
