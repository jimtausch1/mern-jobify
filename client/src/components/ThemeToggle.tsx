import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleTheme } from '../slices/dashboardSlice';
import { toggleDarkTheme } from '../utils';

export default function ThemeToggle() {
  const isDarkTheme = useAppSelector((state) => state.dashboard.isDarkTheme);
  const dispatch = useAppDispatch();

  const toggle = () => {
    const newDarkTheme = !isDarkTheme;
    toggleDarkTheme(newDarkTheme);
    dispatch(toggleTheme());
  };

  return (
    <Wrapper onClick={() => toggle()}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" data-testid="sun-fill" />
      ) : (
        <BsFillMoonFill data-testid="moon-fill" />
      )}
    </Wrapper>
  );
}
