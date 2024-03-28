import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log('hello')
  if (auth.loading) {
    return <p>Loading..</p>;
  }
  if (auth.user === null && auth.loading === false) {
    navigate("/login", { replace: true });
  }
  return children;
};

export default ProtectedRoute;
