import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContexts";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser && currentUser.emailVerified ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
export default PrivateRoute;
