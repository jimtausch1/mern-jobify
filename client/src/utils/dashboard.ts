export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

export const toggleDarkTheme = (isDarkTheme: boolean) => {
  document.body.classList.toggle('dark-theme', isDarkTheme);
  const darkThemeSetting = isDarkTheme ? 'true' : 'false';
  localStorage.setItem('darkTheme', darkThemeSetting);
};
