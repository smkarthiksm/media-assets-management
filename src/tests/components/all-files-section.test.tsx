import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import AllFilesSectionComponent from '../../components/all-files-section/all-files-section';
import * as Api from '../../api';
import {
  waitFor,
} from '@testing-library/react';
import { allFilesStateStub } from '../stubs/all-files-state.stub';

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

  test('should fetch allFiles', async () => {
    const mockFunction = jest
      .spyOn(Api, 'getAllFiles')
      .mockReturnValue(new Promise((res) => res(allFilesStateStub.allFiles)));

    const { store } = renderWithProviders(<AllFilesSectionComponent />);
    if (store) {
      expect(store.getState().allFiles.allFiles).toEqual([]);
      expect(store.getState().allFiles.cachedAllFiles).toEqual([]);
    }

    await waitFor(() => {
      expect(store && store.getState().loader.isLoaderVisible).toBeFalsy();
    });
    if (store) {
      expect(store.getState().allFiles.allFiles).toEqual(
        allFilesStateStub.allFiles,
      );
      expect(store.getState().allFiles.cachedAllFiles).toEqual(
        allFilesStateStub.allFiles,
      );
    }
    mockFunction.mockRestore();
  });
});
