import type { QueryClient } from '@tanstack/react-query';
import { Outlet, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Loading, Navbar, SmallSidebar } from '../components';
import { DashboardProvider } from '../context/DashboardProvider';

interface DashboardLayoutProps {
  queryClient: QueryClient;
}

export default function DashboardLayout({ queryClient }: DashboardLayoutProps) {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <DashboardProvider queryClient={queryClient}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
}
