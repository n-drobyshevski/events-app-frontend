import { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

import { API_URL } from "../config";

const AuthContext = createContext({
  user: {},
  error: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  checkUserLoggedIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register user
  const register = async (user) => {
    console.log(user);
  };
  // Login user
  const login = async ({ email: identifier, password }) => {
    console.log(identifier, password);
  };

  // Logout user
  const logout = async (user) => {
    console.log("logout");
  };
  // Check if user logged in
  const checkUserLoggedIn = async (user) => {
    console.log("Check");
  };

  const providerValue = {
    user: user,
    error: error,
    register: register,
    login: login,
    logout: logout,
    checkUserLoggedIn: checkUserLoggedIn,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
