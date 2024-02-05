import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { redirect, useNavigate } from "react-router-dom"; // Import useNavigate
import { Toast } from "@chakra-ui/react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const getUserFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? { token } : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  // const navigate = useNavigate();

  // const navigate = useNavigate(); // Initialize useNavigate

  const login = (token, userName) => {
    localStorage.setItem("token", token);

    localStorage.setItem("username", userName);
    setUser({ token, userName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  const isAuthenticated = () => {
    console.log(user);
    return !!user?.token;
  };

  // Redirect to /login if not authenticated
  // if (!isAuthenticated()) {
  //   navigate('/login');
  // }
  // const toast = useToast();
  // setTimeout(() => {
  //   localStorage.removeItem("token");
  //   toast({
  //     title: "Session Expired",
  //     description: "Please Login Again",
  //     status: "error",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  //   navigator("/login");
  // }, 5000);
  // 3600000

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
