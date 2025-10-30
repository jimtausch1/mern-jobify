import { FaAlignLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/Navbar';
import { toggleSidebar } from '../slices/dashboardSlice';
import Logo from './Logo';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={() => dispatch(toggleSidebar())}>
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
