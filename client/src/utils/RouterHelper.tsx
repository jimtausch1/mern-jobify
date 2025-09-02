import type { ReactElement } from 'react';
import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';

export function getMemoryRouter(path: string, element: ReactElement) {
  return createMemoryRouter(createRoutesFromElements(<Route path={path} element={element} />), {
    initialEntries: [path],
  });
}
