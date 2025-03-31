import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuthData, clearAuthData } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(getAuthData());
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token || !auth.refreshToken || !auth.user) {
      logout();
    }
  }, []);

  const logout = () => {
    clearAuthData();
    setAuth({ token: null, refreshToken: null, user: null });
    navigate('/login');
  };

  const login = (token: string, refreshToken: string, user: object) => {
    setAuth({ token, refreshToken, user });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);