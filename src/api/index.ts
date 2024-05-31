import { sampleJwtToken, setJwtToken } from '../components/utilities/utility';
import { loginCreds } from '../stubbs/login-stub';

export const getSession = (e: string, p: string): Promise<boolean> => {
  const isUserExist = loginCreds.some(
    ({ email, password }) => email === e && password === p,
  );

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (isUserExist) {
        setJwtToken(sampleJwtToken);
        return res(isUserExist);
      }
      return rej(new Error('Invalid creds'));
    }, 4000);
  });
};
