import React from 'react';
import {  Navigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils/LocalStorageUtils';

const LoginProtected = ({children}) => {
  const token = getLocalStorage('token');
  return token ? <Navigate to='/dashboard' /> : children;
};

export default LoginProtected;
