import { useContext } from "react";
import { FaAlignLeft } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Navbar";
import { DashboardContext } from "../context/DashboardContext";
import Logo from "./Logo";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { toggleSidebar } = useContext(DashboardContext);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
}
