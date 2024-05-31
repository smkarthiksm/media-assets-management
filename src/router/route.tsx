import { Navigate, createBrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/login/login';
import HomeComponent from '../components/home/home';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated } from '../components/utilities/utility';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Navigate to={`/${isAuthenticated() ? 'home' : 'login'}`} replace />
    ),
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/home',
        element: <HomeComponent />,
      },
    ],
  },
  {
    path: '/login',
    element: !isAuthenticated() ? (
      <LoginComponent />
    ) : (
      <Navigate to="/home" replace />
    ),
  },
]);
