import '@testing-library/jest-dom';
import AllFilesHeaderComponent from '../components/all-files-header/all-files-header';
import { renderWithProviders } from './test-utility';
import { fireEvent, screen } from '@testing-library/react';

describe('AllFilesHeaderComponent', () => {
  test('should load component with default values', async () => {
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
