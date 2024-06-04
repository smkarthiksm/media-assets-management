import { AppBar, Avatar, Toolbar } from '@mui/material';
import LogoComponent from '../logo/logo';
import './header.scss';
import { Link } from 'react-router-dom';

export default function HeaderComponent() {
  return (
    <>
      <AppBar position="static">
        <Toolbar className="d-flex justify-content-between">
          <div className="logo-container">
            <LogoComponent />
            <h6 className="d-inline mx-1">Media Assets Management</h6>
          </div>
          <div className="d-flex align-items-center justify-content-end link-container">
            <div>
              <Link className="text-white m-4" to="">
                All
              </Link>
              {/* 
              // Will be implemented later
              <Link className="text-white m-4" to="audio">
                Audio
              </Link>
              <Link className="text-white m-4" to="video">
                Video
              </Link> */}
            </div>
            <Avatar
              alt="Simon Nixon"
              src={require('../../assets/profile-image.png')}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
