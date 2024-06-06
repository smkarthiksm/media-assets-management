import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import EditFileModalComponent from '../../components/edit-file-modal/edit-file-modal';
import { fireEvent, screen } from '@testing-library/react';

describe('EditFileModalComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(
      <EditFileModalComponent
        open={true}
        handleCancel={() => jest.fn()}
        handleSave={() => jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test(`should update first record's fields on text field change`, () => {
    const { store } = renderWithProviders(
      <EditFileModalComponent
        open={true}
        handleCancel={() => jest.fn()}
        handleSave={() => jest.fn()}
      />,
      {
        preloadedState: {
          editFileModal: {
            index: 0,
            isEditFileModalVisible: true,
            title: 'testTitle1',
          },
        },
      },
    );

    const element = screen.getByRole('textbox', {
      name: 'Title',
    }) as HTMLTableCellElement;

    expect(store.getState().editFileModal.title).toEqual('testTitle1');
    fireEvent.change(element, { target: { value: 'updatedTitle' } });
    expect(store.getState().editFileModal.title).toEqual('updatedTitle');
  });
});
