import React from "react";
import { Navigate } from "react-router-dom";

// Dummy auth check
const isAuthenticated = false;

const ProtectedRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
