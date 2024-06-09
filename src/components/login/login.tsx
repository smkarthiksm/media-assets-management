import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
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
    <Grid
      container
      item
      xs={10}
      sm={8}
      md={5}
      margin={'auto'}
      className="login-container"
    >
      <Grid
        container
        item
        className="logo-container"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <LogoComponent />
        </Grid>
        <Grid item>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Media Assets Management
          </Typography>
        </Grid>
        <Grid item className='seperator-container'>
          <div className="seperator mt-2"></div>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <TextField
            className="input-field mt-4"
            fullWidth
            placeholder="Email"
            size="small"
            name="email"
            value={email}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        {loginError && (
          <Grid item xs={12}>
            <Typography
              className="mt-2 text-center"
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Account not found!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
