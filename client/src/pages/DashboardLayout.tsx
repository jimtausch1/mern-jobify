import type { QueryClient } from '@tanstack/react-query';
import { Outlet, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Loading, Navbar, SmallSidebar } from '../components';
import { useDashboardContext } from '../context/DashboardContext';
import { DashboardProvider } from '../context/DashboardProvider';
// import customFetch from "../utils/customFetch";

interface DashboardLayoutProps {
  queryClient: QueryClient;
}

// const userQuery = {
//   queryKey: ["user"],
//   queryFn: async () => {
//     const { data } = await customFetch.get("/users/current-user");
//     return data;
//   },
// };

// export const loader = (queryClient) => async () => {
//   try {
//     return await queryClient.ensureQueryData(userQuery);
//   } catch {
//     return redirect("/");
//   }
// };

export default function DashboardLayout({ queryClient }: DashboardLayoutProps) {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const { user } = useDashboardContext();
  // const [isAuthError, setIsAuthError] = useState(false);

  // customFetch.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error?.response?.status === 401) {
  //       setIsAuthError(true);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // useEffect(() => {
  //   if (!isAuthError) return;
  //   logoutUser();
  // }, [isAuthError]);

  return (
    <DashboardProvider queryClient={queryClient}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
}
