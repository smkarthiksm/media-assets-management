import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import AllFilesSectionComponent from '../../components/all-files-section/all-files-section';

describe('AllFilesSectionComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<AllFilesSectionComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should be null when isLoaderVisible is true', () => {
    const { container } = renderWithProviders(<AllFilesSectionComponent />, {
      preloadedState: {
        loader: { isLoaderVisible: true },
      },
    });

    expect(container).toBeEmptyDOMElement();
  });
});
