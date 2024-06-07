import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import LogoComponent from '../../components/logo/logo';

describe('LogoComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<LogoComponent />);
    expect(container).toMatchSnapshot();
  });
});
