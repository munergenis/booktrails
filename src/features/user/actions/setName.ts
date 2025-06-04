export const setUserName = (userName: string) => {
  localStorage.setItem('booksApp_user', userName);
};

export const getUserName = (): string | null => {
  return localStorage.getItem('booksApp_user');
};

export const destroyUser = () => {
  localStorage.removeItem('booksApp_user');
};
