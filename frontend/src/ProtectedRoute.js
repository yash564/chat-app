import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
