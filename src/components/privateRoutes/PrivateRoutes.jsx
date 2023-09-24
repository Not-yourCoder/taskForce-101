import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
