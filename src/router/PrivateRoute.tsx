import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../components/utilities/utility';

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
