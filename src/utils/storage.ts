export const setAuthData = (token: string, refreshToken: string, user: object) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getAuthData = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');
  return {
    token,
    refreshToken,
    user: user ? JSON.parse(user) : null,
  };
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};