import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import { fireEvent, screen } from '@testing-library/react';
import { allFilesStateStub } from '../stubs/all-files-state.stub';
import UploadFileModalComponent from '../../components/upload-file-modal/upload-file-modal';

  describe('UploadFileModalComponent', () => {
    test('should hide the modal on clicking cancel', () => {
      const { store } = renderWithProviders(<UploadFileModalComponent />, {
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
      const { store } = renderWithProviders(<UploadFileModalComponent />, {
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
