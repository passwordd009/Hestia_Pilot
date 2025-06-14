import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import AuthContext from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded)
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
