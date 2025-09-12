import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../context/DashboardContext';
import { links } from '../utils';

interface NavLinksProps {
  isBigSidebar?: boolean;
}

export default function NavLinks({ isBigSidebar }: NavLinksProps) {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? () => {} : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
