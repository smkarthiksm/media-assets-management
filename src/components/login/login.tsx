import { Button, CircularProgress, TextField } from '@mui/material';
import './login.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  selectLogin,
  updateFields,
} from '../../redux-utilities/slices/auth-slice';
import { ChangeEvent, useState } from 'react';
import { emailValidation } from '../utilities/validators';
import { AppDispatch } from '../../redux-utilities/types';
import { useNavigate } from 'react-router-dom';

export default function () {
  const [loginError, setLoginError] = useState(false);
  const { email, password, isLoaderVisible } = useSelector(selectLogin);
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
    } else {
      setLoginError(true);
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="logo-container">
          <div className="logo"></div>
          <h4>Media Assets Management</h4>
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
        {loginError && <h6 className="mt-4">Invalid login creds!</h6>}
      </div>
    </>
  );
}
