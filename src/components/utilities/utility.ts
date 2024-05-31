export const setJwtToken = (token: string) => {
  localStorage.setItem('jwt', token);
};

export const getJwtToken = () => {
  return localStorage.getItem('jwt');
};

export const sampleJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNpbW9uIE5peG9uIiwiaWF0IjoxNTE2MjM5MDIyfQ.uAtBWmANdDtnj-heMCuWroQYzW0L-GUajjEeXYkvE38';

export const isAuthenticated = () => !!getJwtToken();
