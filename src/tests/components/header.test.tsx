import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import HeaderComponent from '../../components/header/header';
import { fireEvent, screen } from '@testing-library/react';
import { getJwtToken, setJwtToken } from '../../utilities/utility';

describe('HeaderComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<HeaderComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should show menu options when profile icon is clicked', () => {
    renderWithProviders(<HeaderComponent />);

    const profileIconButton = screen.getByRole('button');
    fireEvent.click(profileIconButton);
    const menuItem = screen.getByRole('menuitem', { name: 'Logout' });
    expect(menuItem).toBeInTheDocument();
  });

  test('should logout when option is clicked', () => {
    setJwtToken('test');
    renderWithProviders(<HeaderComponent />);

    const profileIconButton = screen.getByRole('button');
    fireEvent.click(profileIconButton);
    const menuItem = screen.getByRole('menuitem', { name: 'Logout' });

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });

    expect(getJwtToken()).toEqual('test');
    fireEvent.click(menuItem);
    expect(getJwtToken()).toBeNull();
  });
});
