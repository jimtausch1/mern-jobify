import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorElement from './components/ErrorElement';
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from './pages';
import { checkDefaultTheme } from './utils/CheckDefaultTheme';

import { loader as dashboardLoader } from './actions/DashboardLoader';
import { action as loginAction } from './actions/LoginAction';
import { action as registerAction } from './actions/RegisterAction';
// import { action as addJobAction } from './pages/AddJob';
// import { loader as allJobsLoader } from './pages/AllJobs';
// import { loader as editJobLoader } from './pages/EditJob';
// import { action as editJobAction } from './pages/EditJob';
// import { action as deleteJobAction } from './pages/DeleteJob';
// import { loader as adminLoader } from './pages/Admin';
// import { action as profileAction } from './pages/Profile';
import { loader as statsLoader } from './actions/StatsLoader';

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            // action: addJobAction(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            // loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
            // action: profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            // loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            // loader: editJobLoader(queryClient),
            // action: editJobAction(queryClient),
          },
          {
            path: 'delete-job/:id',
            // action: deleteJobAction(queryClient)
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
