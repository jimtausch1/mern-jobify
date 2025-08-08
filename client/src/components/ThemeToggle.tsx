import { useContext } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { DashboardContext } from "../context/DashboardContext";

export default function ThemeToggle() {
  const { isDarkTheme, toggleDarkTheme } = useContext(DashboardContext);

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill />
      )}
    </Wrapper>
  );
}
