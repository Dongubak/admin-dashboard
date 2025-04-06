export const setAuthData = (
  token: string,
  refreshToken: string,
  user: object
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('RT', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getAuthData = () => {
  const token = localStorage.getItem('token');
  const RT = localStorage.getItem('RT');
  const user = localStorage.getItem('user');
  return {
    token,
    RT,
    user: user ? JSON.parse(user) : null,
  };
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('RT');
  localStorage.removeItem('user');
};
