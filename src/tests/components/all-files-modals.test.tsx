import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import { fireEvent, screen } from '@testing-library/react';
import AllFilesModalsComponent from '../../components/all-files-modals/all-files-modals';
import { allFilesStateStub } from '../stubs/all-files-state.stub';

describe('AllFilesModalsComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<AllFilesModalsComponent />);
    expect(container).toMatchSnapshot();
  });

  describe('UploadFilesModalComponent', () => {
    test('should hide the modal on clicking cancel', () => {
      const { store } = renderWithProviders(<AllFilesModalsComponent />, {
        preloadedState: {
          uploadFileModal: { isUploadFileModalVisible: true },
        },
      });
      const cancelButton = screen.getByRole('button', {
        name: 'Cancel',
      });
      expect(
        store.getState().uploadFileModal.isUploadFileModalVisible,
      ).toBeTruthy();
      fireEvent.click(cancelButton);
      expect(
        store.getState().uploadFileModal.isUploadFileModalVisible,
      ).toBeFalsy();
    });

    test('should add the files on clicking upload', () => {
      const { store } = renderWithProviders(<AllFilesModalsComponent />, {
        preloadedState: {
          allFiles: allFilesStateStub,
          uploadFileModal: { isUploadFileModalVisible: true },
          fileUploadStepper: {
            activeStep: 1,
            files: [
              {
                album: 'testAlbum3',
                artist: 'testArtist3',
                duration: '02:12',
                fileType: 'audio',
                title: 'testTitle3',
              },
            ],
          },
        },
      });
      const uploadButton = screen.getByRole('button', {
        name: 'Upload',
      });
      expect(store.getState().allFiles.allFiles).toHaveLength(2);
      expect(store.getState().allFiles.cachedAllFiles).toHaveLength(2);
      expect(
        store.getState().uploadFileModal.isUploadFileModalVisible,
      ).toBeTruthy();
      fireEvent.click(uploadButton);
      expect(store.getState().allFiles.allFiles).toHaveLength(3);
      expect(store.getState().allFiles.cachedAllFiles).toHaveLength(3);
      expect(
        store.getState().uploadFileModal.isUploadFileModalVisible,
      ).toBeFalsy();
    });
  });

  describe('EditFilesModalComponent', () => {
    test('should hide the modal on clicking cancel', () => {
      const { store } = renderWithProviders(<AllFilesModalsComponent />, {
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

    test('should edit the first file on clicking upload', () => {
      const { store } = renderWithProviders(<AllFilesModalsComponent />, {
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

  describe('DeleteFileModalComponent', () => {
    test('should hide the modal on clicking cancel', () => {
      const { store } = renderWithProviders(<AllFilesModalsComponent />, {
        preloadedState: {
          allFiles: allFilesStateStub,
          deleteFileModal: { isDeleteFileModalVisible: true, index: 0 },
        },
      });
      const deleteButton = screen.getByRole('button', {
        name: 'Cancel',
      });
      expect(
        store.getState().deleteFileModal.isDeleteFileModalVisible,
      ).toBeTruthy();
      fireEvent.click(deleteButton);
      expect(
        store.getState().deleteFileModal.isDeleteFileModalVisible,
      ).toBeFalsy();
    });

    test('should delete the first file', () => {
      const { store } = renderWithProviders(<AllFilesModalsComponent />, {
        preloadedState: {
          allFiles: allFilesStateStub,
          deleteFileModal: { isDeleteFileModalVisible: true, index: 0 },
        },
      });
      const deleteButton = screen.getByRole('button', {
        name: 'Delete',
      });
      expect(store.getState().allFiles.allFiles).toHaveLength(2);
      expect(store.getState().allFiles.cachedAllFiles).toHaveLength(2);
      expect(
        store.getState().deleteFileModal.isDeleteFileModalVisible,
      ).toBeTruthy();
      fireEvent.click(deleteButton);
      expect(store.getState().allFiles.allFiles).toHaveLength(1);
      expect(store.getState().allFiles.cachedAllFiles).toHaveLength(1);
      expect(
        store.getState().deleteFileModal.isDeleteFileModalVisible,
      ).toBeFalsy();
    });
  });
});
