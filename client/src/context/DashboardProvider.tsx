import { useQuery, type QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userQuery } from '../actions/DashboardLoader';
import { checkDefaultTheme } from '../utils/CheckDefaultTheme';
import customFetch from '../utils/customFetch';
import { DashboardContext } from './DashboardContext';

interface DashboardProviderProps {
  children: React.ReactNode | string;
  queryClient: QueryClient;
}
export function DashboardProvider({ children, queryClient }: DashboardProviderProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    const darkThemeSetting = newDarkTheme ? 'true' : 'false';
    localStorage.setItem('darkTheme', darkThemeSetting);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    queryClient.invalidateQueries();
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      {' '}
      {children}{' '}
    </DashboardContext.Provider>
  );
}
