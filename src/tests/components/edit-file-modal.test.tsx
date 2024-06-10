import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import EditFileModalComponent from '../../components/edit-file-modal/edit-file-modal';
import { fireEvent, screen } from '@testing-library/react';
import { allFilesStateStub } from '../stubs/all-files-state.stub';

describe('EditFileModalComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<EditFileModalComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should hide the modal on clicking cancel', () => {
    const { store } = renderWithProviders(<EditFileModalComponent />, {
      preloadedState: {
        allFiles: allFilesStateStub,
        editFileModal: {
          isEditFileModalVisible: true,
          index: 0,
          album: 'updatedAlbumValue',
          artist: 'updatedArtistValue',
          title: 'updatedTitleValue',
        },
      },
    });
    const editButton = screen.getByRole('button', {
      name: 'Cancel',
    });
    expect(
      store.getState().editFileModal.isEditFileModalVisible,
    ).toBeTruthy();
    fireEvent.click(editButton);
    expect(store.getState().editFileModal.isEditFileModalVisible).toBeFalsy();
  });

  test(`should update first record's fields on text field change`, () => {
    const { store } = renderWithProviders(<EditFileModalComponent />, {
      preloadedState: {
        editFileModal: {
          index: 0,
          isEditFileModalVisible: true,
          title: 'testTitle1',
        },
      },
    });

    const element = screen.getByRole('textbox', {
      name: 'Title',
    }) as HTMLTableCellElement;

    expect(store.getState().editFileModal.title).toEqual('testTitle1');
    fireEvent.change(element, { target: { value: 'updatedTitle' } });
    expect(store.getState().editFileModal.title).toEqual('updatedTitle');
  });

  test('should edit the first file on clicking upload', () => {
    const { store } = renderWithProviders(<EditFileModalComponent />, {
      preloadedState: {
        allFiles: allFilesStateStub,
        editFileModal: {
          isEditFileModalVisible: true,
          index: 0,
          album: 'updatedAlbumValue',
          artist: 'updatedArtistValue',
          title: 'updatedTitleValue',
        },
      },
    });
    const editButton = screen.getByRole('button', {
      name: 'Save',
    });
    expect(store.getState().allFiles.allFiles[0]).toEqual({
      album: 'testAlbum1',
      artist: 'testArtist1',
      duration: '02:12',
      fileType: 'audio',
      title: 'testTitle1',
    });
    expect(store.getState().allFiles.cachedAllFiles[0]).toEqual({
      album: 'testAlbum1',
      artist: 'testArtist1',
      duration: '02:12',
      fileType: 'audio',
      title: 'testTitle1',
    });
    expect(
      store.getState().editFileModal.isEditFileModalVisible,
    ).toBeTruthy();
    fireEvent.click(editButton);
    expect(store.getState().allFiles.allFiles[0]).toEqual({
      album: 'updatedAlbumValue',
      artist: 'updatedArtistValue',
      duration: '02:12',
      fileType: 'audio',
      title: 'updatedTitleValue',
    });
    expect(store.getState().allFiles.cachedAllFiles[0]).toEqual({
      album: 'updatedAlbumValue',
      artist: 'updatedArtistValue',
      duration: '02:12',
      fileType: 'audio',
      title: 'updatedTitleValue',
    });
    expect(store.getState().editFileModal.isEditFileModalVisible).toBeFalsy();
  });
});
