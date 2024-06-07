import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import './login.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  authStateSelector,
  login,
  updateFields,
} from '../../redux-utilities/slices/auth-slice';
import { ChangeEvent } from 'react';
import { emailValidation } from '../../utilities/validators';
import { AppDispatch } from '../../redux-utilities/types';
import { useNavigate } from 'react-router-dom';
import LogoComponent from '../logo/logo';

export default function LoginComponent() {
  const { email, password, isLoaderVisible, loginError } =
    useSelector(authStateSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateFields({ prop: event.target.name, value: event.target.value }),
    );
  }

  function validateInput() {
    if (emailValidation(email) && password) {
      return true;
    } else {
      return false;
    }
  }

  async function onSubmitHandler() {
    const { payload } = await dispatch(login({ email, password }));
    if (payload) {
      navigate('/home');
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="logo-container">
          <LogoComponent />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Media Assets Management
          </Typography>
          <div className="seperator mt-2"></div>
        </div>
        <div>
          <TextField
            className="input-field mt-4"
            fullWidth
            placeholder="Email"
            size="small"
            name="email"
            value={email}
            onChange={onChangeHandler}
          />
          <TextField
            className="input-field mt-3"
            fullWidth
            placeholder="Password"
            type="password"
            size="small"
            name="password"
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <Button
            className="mt-3"
            variant="contained"
            fullWidth
            disabled={!validateInput()}
            onClick={onSubmitHandler}
          >
            {isLoaderVisible ? (
              <CircularProgress color="inherit" size={'1.5rem'} />
            ) : (
              'Login'
            )}
          </Button>
        </div>
        {loginError && (
          <Typography
            className="mt-2 text-center"
            variant="subtitle1"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Account not found!
          </Typography>
        )}
      </div>
    </>
  );
}
