import { QueryClient } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function getMemoryRouter(paths: string[], element: ReactElement) {
  const stuff = paths.map((path: string) => {
    return <Route path={path} element={element} />;
  });

  return createMemoryRouter(createRoutesFromElements(stuff), {
    initialEntries: paths,
  });
}
