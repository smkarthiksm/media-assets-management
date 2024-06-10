import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import { fireEvent, screen } from '@testing-library/react';
import { allFilesStateStub } from '../stubs/all-files-state.stub';
import DeleteFileModalComponent from '../../components/delete-file-modal/delete-file-modal';

describe('DeleteFileModalComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<DeleteFileModalComponent />, {
      preloadedState: {
        allFiles: allFilesStateStub,
        deleteFileModal: { isDeleteFileModalVisible: true, index: 0 },
      },
    });
    expect(container).toMatchSnapshot();
  });

  test('should hide the modal on clicking cancel', () => {
    const { store } = renderWithProviders(<DeleteFileModalComponent />, {
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
    const { store } = renderWithProviders(<DeleteFileModalComponent />, {
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
