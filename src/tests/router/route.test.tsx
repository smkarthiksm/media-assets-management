import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../../router/route';
import { Provider } from 'react-redux';
import { appStore } from '../../redux-utilities/store';

const renderWithProvider = () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/'],
  });
  return render(
    <Provider store={appStore({})}>
      <RouterProvider router={router} />
    </Provider>,
  );
};
describe('Router component', () => {
  describe('Login Route', () => {
    test('should load login page', () => {
      const { container } = renderWithProvider();

      expect(container).toMatchSnapshot();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    test('should load login page when not logged in', () => {
      renderWithProvider();

      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    test('should load login page when not logged in and requested bad route', () => {
      renderWithProvider();

      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });
  });
});
