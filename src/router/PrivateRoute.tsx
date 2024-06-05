import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utilities/utility';

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
