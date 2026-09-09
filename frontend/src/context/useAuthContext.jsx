import Cookies from 'js-cookie';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext(undefined);
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
const authSessionKey = '_INDOVIA_AUTH_KEY_';
export function AuthProvider({
  children
}) {
  const navigate = useNavigate();
  const getSession = () => {
    const fetchedCookie = Cookies.get(authSessionKey);
    if (!fetchedCookie) return undefined;
    try {
      const parsed = JSON.parse(fetchedCookie);
      if (parsed && typeof parsed === 'object' && (parsed.token || parsed.email || parsed.id)) {
        return parsed;
      }
      return undefined;
    } catch {
      return undefined;
    }
  };
  const [user, setUser] = useState(getSession());
  const saveSession = user => {
    Cookies.set(authSessionKey, JSON.stringify(user), {
      expires: 7 // cookie valid for 7 days
    });
    setUser(user);
  };
  const removeSession = () => {
    Cookies.remove(authSessionKey, { path: '/' });
    Cookies.remove('_LARKON_AUTH_KEY_', { path: '/' });
    try {
      localStorage.removeItem(authSessionKey);
      localStorage.removeItem('_LARKON_AUTH_KEY_');
    } catch {}
    setUser(undefined);
    navigate('/auth/sign-in');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: Boolean(user && (user.token || user.email || user.id)),
    saveSession,
    removeSession
  }}>
      {children}
    </AuthContext.Provider>;
}