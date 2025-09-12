import type { ReactElement } from 'react';
import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';

export function getMemoryRouter(paths: string[], element: ReactElement) {
  const stuff = paths.map((path: string) => {
    return <Route path={path} element={element} />;
  });

  return createMemoryRouter(createRoutesFromElements(stuff), {
    initialEntries: paths,
  });
}
