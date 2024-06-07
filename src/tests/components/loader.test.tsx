import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import LoaderComponent from '../../components/loader/loader';
import { screen } from '@testing-library/react';

describe('LoaderComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<LoaderComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should show loader', () => {
    renderWithProviders(<LoaderComponent />, {
      preloadedState: { loader: { isLoaderVisible: true } },
    });

    const loader = screen.getByRole('progressbar');
    expect(loader).toBeInTheDocument();
  });
});
