import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkDefaultTheme } from "../utils/CheckDefaultTheme";
import { DashboardContext } from "./DashboardContext";

interface DashboardProviderProps {
  children: React.ReactNode | string;
}
export function DashboardProvider({ children }: DashboardProviderProps) {
  const user = { name: "John" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  // const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    const darkThemeSetting = newDarkTheme ? "true" : "false";
    localStorage.setItem("darkTheme", darkThemeSetting);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    // await customFetch.get("/auth/logout");
    // queryClient.invalidateQueries();
    toast.success("Logging out...");
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
      {" "}
      {children}{" "}
    </DashboardContext.Provider>
  );
}
