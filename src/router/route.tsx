import { Navigate, createBrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/login/login';
import HomeComponent from '../components/home/home';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated } from '../components/utilities/utility';
import AllFilesSectionComponent from '../components/all-files-section/all-files-section';

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
]);
