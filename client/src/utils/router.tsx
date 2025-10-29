import type { ReactElement } from 'react';
import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';

export function getMemoryRouter(paths: string[], element: ReactElement) {
  const children = paths.map((path: string) => {
    return <Route path={path} element={element} />;
  });

  return createMemoryRouter(createRoutesFromElements(children), {
    initialEntries: paths,
  });
}
