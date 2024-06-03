import { Navigate, createBrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/login/login';
import HomeComponent from '../components/home/home';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated } from '../components/utilities/utility';
import AudioSectionComponent from '../components/audio-section/audio-section';
import AllFilesSectionComponent from '../components/all-files-section/all-files-section';
import VideoSectionComponent from '../components/video-section/video-section';

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
          {
            path: 'audio',
            element: <AudioSectionComponent />,
          },
          {
            path: 'video',
            element: <VideoSectionComponent />,
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
