import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleSidebar } from '../slices/dashboardSlice';
import Logo from './Logo';
import NavLinks from './NavLinks';

export default function SmallSidebar() {
  const showSidebar = useAppSelector((state) => state.dashboard.showSidebar);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button
            type="button"
            className="close-btn"
            data-testid="toggle-sidebar"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}
