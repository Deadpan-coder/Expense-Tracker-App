import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

// Custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On first load, check if user is already saved in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
