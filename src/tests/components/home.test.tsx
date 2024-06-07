import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import HomeComponent from '../../components/home/home';

describe('HomeComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<HomeComponent />);
    expect(container).toMatchSnapshot();
  });
});
