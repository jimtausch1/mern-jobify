import { action as addJobAction } from './actions/AddJobAction';
import { loader as adminLoader } from './actions/AdminLoader';
import { loader as allJobsLoader } from './actions/AllJobsLoader';
import { loader as dashboardLoader } from './actions/DashboardLoader';
import { action as deleteJobAction } from './actions/DeleteJobAction';
import { action as editJobAction } from './actions/EditJobAction';
import { loader as editJobLoader } from './actions/EditJobLoader';
import { action as loginAction } from './actions/LoginAction';
import { action as profileAction } from './actions/ProfileAction';
import { action as registerAction } from './actions/RegisterAction';
import { loader as statsLoader } from './actions/StatsLoader';
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
import { queryClient } from './utils';

export const routes = [
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
            action: addJobAction(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
];
