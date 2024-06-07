import '@testing-library/jest-dom';
import AllFilesHeaderComponent from '../../components/all-files-header/all-files-header';
import { renderWithProviders } from '../test-utility';
import { fireEvent, screen } from '@testing-library/react';
import { allFilesStateStub } from '../stubs/all-files-state.stub';

describe('AllFilesHeaderComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<AllFilesHeaderComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should update search text field when input changes', () => {
    renderWithProviders(<AllFilesHeaderComponent />);
    const searchField = screen.getByPlaceholderText(
      'Search by title, album, artist',
    ) as HTMLInputElement;
    fireEvent.change(searchField, { target: { value: 'Test' } });
    expect(searchField.value).toEqual('Test');
  });

  test('should reset files with the cached files when search text field becomes empty', () => {
    const { store } = renderWithProviders(<AllFilesHeaderComponent />, {
      preloadedState: {
        allFiles: {
          allFiles: [allFilesStateStub.allFiles[0]],
          cachedAllFiles: allFilesStateStub.allFiles,
          searchValue: 'test',
        },
      },
    });
    const searchField = screen.getByPlaceholderText(
      'Search by title, album, artist',
    ) as HTMLInputElement;

    expect(store.getState().allFiles.allFiles).toEqual([
      allFilesStateStub.allFiles[0],
    ]);
    fireEvent.change(searchField, { target: { value: '' } });

    expect(store.getState().allFiles.allFiles).toEqual(
      allFilesStateStub.allFiles,
    );
  });

  // added for code coverage
  test('should return file when title or album or artist matches', () => {
    const { store } = renderWithProviders(<AllFilesHeaderComponent />, {
      preloadedState: {
        allFiles: {
          allFiles: allFilesStateStub.allFiles,
          cachedAllFiles: allFilesStateStub.cachedAllFiles,
          searchValue: '',
        },
      },
    });
    const searchField = screen.getByPlaceholderText(
      'Search by title, album, artist',
    ) as HTMLInputElement;
    fireEvent.change(searchField, { target: { value: 'testAlbum1' } });
    expect(store.getState().allFiles.allFiles).toEqual([
      allFilesStateStub.allFiles[0],
    ]);
    fireEvent.change(searchField, { target: { value: 'testArtist1' } });
    expect(store.getState().allFiles.allFiles).toEqual([
      allFilesStateStub.allFiles[0],
    ]);
    fireEvent.change(searchField, { target: { value: 'testTitle1' } });
    expect(store.getState().allFiles.allFiles).toEqual([
      allFilesStateStub.allFiles[0],
    ]);
  });

  test('should reset and open modal to upload files', () => {
    const { store } = renderWithProviders(<AllFilesHeaderComponent />);
    const uploadButton = screen.getByRole('button', {
      name: 'Upload',
    });
    expect(
      store.getState().uploadFileModal.isUploadFileModalVisible,
    ).toBeFalsy();
    fireEvent.click(uploadButton);
    expect(
      store.getState().uploadFileModal.isUploadFileModalVisible,
    ).toBeTruthy();
  });
});
