import { action as addJobAction } from './actions/AddJobAction';
// import { loader as adminLoader } from './actions/AdminLoader';
import { loader as allJobsLoader } from './actions/AllJobsLoader';
import { loader as dashboardLoader } from './actions/DashboardLoader';
// import { action as deleteJobAction } from './actions/DeleteJobAction';
// import { action as editJobAction } from './actions/EditJobAction';
// import { loader as editJobLoader } from './actions/EditJobLoader';
import { action as loginAction } from './actions/LoginAction';
// import { action as profileAction } from './actions/ProfileAction';
import { action as registerAction } from './actions/RegisterAction';
import { loader as statsLoader } from './actions/StatsLoader';
import {
  AddJob,
  // Admin,
  AllJobs,
  DashboardLayout,
  // EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  // Profile,
  Register,
  Stats,
} from './pages';

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
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'add-job',
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          //   {
          //     path: 'profile',
          //     element: <Profile />,
          //     action: profileAction,
          //   },
          //   {
          //     path: 'admin',
          //     element: <Admin />,
          //     loader: adminLoader,
          //   },
          //   {
          //     path: 'edit-job/:id',
          //     element: <EditJob />,
          //     loader: editJobLoader,
          //     action: editJobAction,
          //   },
          //   {
          //     path: 'delete-job/:id',
          //     action: deleteJobAction,
          //   },
        ],
      },
    ],
  },
];
