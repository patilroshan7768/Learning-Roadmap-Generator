import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // Use undefined for initial loading state

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      setUser(userInfo ? JSON.parse(userInfo) : null);
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;