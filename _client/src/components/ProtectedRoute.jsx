import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in
  const isAuthenticated = sessionStorage.getItem("loggedInUser");

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
