import { Button, TextField } from '@mui/material';
import './login.scss';

function LoginComponent() {
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
            error={false}
          />
          <TextField
            className="input-field mt-3"
            fullWidth
            placeholder="Password"
            type="password"
            size="small"
            error={true}
          />
        </div>
        <div>
          <Button className='mt-3' variant="contained" fullWidth>Login</Button>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
