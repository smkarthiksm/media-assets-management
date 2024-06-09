import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/login/login';
import HomeComponent from '../components/home/home';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated } from '../utilities/utility';
import AllFilesSectionComponent from '../components/all-files-section/all-files-section';

export const routesConfig: RouteObject[] = [
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
        children: [
          {
            path: '',
            element: <AllFilesSectionComponent />,
          },
        ],
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
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export const router = createBrowserRouter(routesConfig);
