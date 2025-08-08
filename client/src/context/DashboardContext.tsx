import { createContext } from "react";

interface DashboardContextValues {
  user: { name: string; role?: string; avatar?: string };
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
}

export const DashboardContext = createContext<DashboardContextValues>({
  user: { name: "" },
  showSidebar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
});
