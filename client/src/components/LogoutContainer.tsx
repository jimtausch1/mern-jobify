import { useCallback, useState } from 'react';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useAppDispatch } from '../hooks';
import { jobifyApi, useGetCurrentUserQuery } from '../slices/jobifyApiSlice';
import { customFetch } from '../utils';

export default function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);
  const { data } = useGetCurrentUserQuery('bulbasaur');
  const user = data ?? ({} as UserModel);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutUser = useCallback(async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    dispatch(jobifyApi.util.resetApiState());
    // queryClient.invalidateQueries();
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
