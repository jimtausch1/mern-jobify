import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/BigSidebar';
import type { RootState } from '../store';
import Logo from './Logo';
import NavLinks from './NavLinks';

export default function BigSidebar() {
  const showSidebar = useSelector((state: RootState) => state.dashboard.showSidebar);

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
}
