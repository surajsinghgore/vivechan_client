import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getLocalStorage } from '../../utils/LocalStorageUtils';


const RootFunction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = getLocalStorage('token');

  useEffect(() => {
    if (location.pathname === '/') {
      if (isAuthenticated) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootFunction;
