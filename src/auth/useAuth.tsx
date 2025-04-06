import { useAuthContext } from './AuthContext';

export const useAuth = () => {
  const { auth, setAuth, logout } = useAuthContext();
  return { auth, setAuth, logout };
};
