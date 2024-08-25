import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils/LocalStorageUtils';

const Root = () => {
  const navigate = useNavigate();
  const isAuthenticated = getLocalStorage("token");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default Root;
