import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import { fireEvent, screen } from '@testing-library/react';
import AllFilesTableComponent from '../../components/all-files-table/all-files-table';
import { allFilesStateStub } from '../stubs/all-files-state.stub';

describe('AllFilesTableComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<AllFilesTableComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should render empty table when no data is present', () => {
    renderWithProviders(<AllFilesTableComponent />, {
      preloadedState: {
        allFiles: { allFiles: [], cachedAllFiles: [], searchValue: '' },
      },
    });

    const element = screen.getByRole('cell') as HTMLTableCellElement;
    expect(element.innerHTML).toEqual('No records found');
  });

  test('should render table when data is present', () => {
    renderWithProviders(<AllFilesTableComponent />, {
      preloadedState: {
        allFiles: allFilesStateStub,
      },
    });
    const elements = screen.getAllByRole('row') as HTMLTableRowElement[];
    expect(elements).toHaveLength(3);
  });

  test('should populate first row fields and open edit modal', () => {
    const { store } = renderWithProviders(<AllFilesTableComponent />, {
      preloadedState: {
        allFiles: allFilesStateStub,
      },
    });
    const editButton = screen.getAllByTestId('EditIcon')[0];
    fireEvent.click(editButton);
    expect(store.getState().editFileModal).toEqual({
      title: 'testTitle1',
      album: 'testAlbum1',
      artist: 'testArtist1',
      index: 0,
      isEditFileModalVisible: true,
    });
  });

  test('should populate first row fields and open delete modal', () => {
    const { store } = renderWithProviders(<AllFilesTableComponent />, {
      preloadedState: {
        allFiles: allFilesStateStub,
      },
    });
    const deleteButton = screen.getAllByTestId('DeleteIcon')[0];
    fireEvent.click(deleteButton);
    expect(store.getState().deleteFileModal).toEqual({
      index: 0,
      isDeleteFileModalVisible: true,
    });
  });
});
