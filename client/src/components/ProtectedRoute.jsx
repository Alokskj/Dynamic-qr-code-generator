import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  if (auth.loading) {
    return <Loader />;
  }
  if (auth.user === null && auth.loading === false) {
    navigate("/login", { replace: true });
  }
  return children;
};

export default ProtectedRoute;
