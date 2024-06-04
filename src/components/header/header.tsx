import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import LogoComponent from '../logo/logo';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { removeJwtToken } from '../utilities/utility';
import { useDispatch } from 'react-redux';

export default function HeaderComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    removeJwtToken();
    dispatch({ type: 'logout' });
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      <AppBar position="fixed">
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
            <IconButton onClick={handleClick} className="profile-button">
              <Avatar
                alt="Simon Nixon"
                src={require('../../assets/profile-image.png')}
              />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
