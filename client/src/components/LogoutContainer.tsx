import { useCallback, useState } from 'react';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { dashboardSlice } from '../slices/dashboardSlice';
import { jobifyApi } from '../slices/jobifyApiSlice';

export default function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);
  const user = useAppSelector((state) => state.dashboard.currentUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutUser = useCallback(async () => {
    navigate('/');
    await dispatch(jobifyApi.endpoints.logoutUser.initiate());
    dispatch(dashboardSlice.actions.loadUser({} as UserModel));
    dispatch(jobifyApi.util.resetApiState());
    toast.success('Logging out...');
  }, [navigate, dispatch]);

  return (
    <Wrapper>
      <button type="button" className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
        {user.avatar ? <img src={user.avatar} alt="avatar" className="img" /> : <FaUserCircle />}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
}
