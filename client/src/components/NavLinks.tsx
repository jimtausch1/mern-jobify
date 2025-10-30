import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { toggleSidebar } from '../slices/dashboardSlice';
import { useGetCurrentUserQuery } from '../slices/jobifyApiSlice';
import { links } from '../utils';

interface NavLinksProps {
  isBigSidebar?: boolean;
}

export default function NavLinks({ isBigSidebar }: NavLinksProps) {
  // Using a query hook automatically fetches data and returns query values
  const { data } = useGetCurrentUserQuery('bulbasaur');
  const user = data ?? ({} as UserModel);
  const dispatch = useAppDispatch();

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
            onClick={isBigSidebar ? () => {} : () => dispatch(toggleSidebar())}
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
