import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/LocalStorageUtils";

const DashboardProtected = ({ children }) => {
  const token = getLocalStorage("token");
  return token ? children : <Navigate to="/login" />;
};

export default DashboardProtected;
