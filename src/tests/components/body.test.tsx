import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import BodyComponent from '../../components/body/body';

describe('BodyComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<BodyComponent />);
    expect(container).toMatchSnapshot();
  });
});
