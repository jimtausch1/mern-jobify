import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import { checkDefaultTheme } from './utils';

checkDefaultTheme();

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
