import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import ModalComponent from '../../components/modal/modal';
import { fireEvent, screen } from '@testing-library/react';

describe('ModalComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(
      <ModalComponent
        closeButtonTitle="Test"
        handleCancel={() => jest.fn()}
        handleClose={() => jest.fn()}
        modalTitle="Test Title"
        open={true}
        size="sm"
        disableCloseButton={false}
      >
        Test Content
      </ModalComponent>,
    );
    expect(container).toMatchSnapshot();
  });

  test('should trigger close function', () => {
    const mockFunction = jest.fn();
    const closeButtonTitle = 'Close';
    renderWithProviders(
      <ModalComponent
        closeButtonTitle={closeButtonTitle}
        handleCancel={() => jest.fn()}
        handleClose={mockFunction}
        modalTitle="Test Title"
        open={true}
        size="sm"
        disableCloseButton={false}
      >
        Test Content
      </ModalComponent>,
    );

    const closeButton = screen.getByRole('button', {
      name: closeButtonTitle,
    });
    fireEvent.click(closeButton);
    expect(mockFunction).toBeCalled();
  });

  test('should trigger cancel function', () => {
    const mockFunction = jest.fn();
    renderWithProviders(
      <ModalComponent
        closeButtonTitle="Close"
        handleCancel={mockFunction}
        handleClose={() => jest.fn()}
        modalTitle="Test Title"
        open={true}
        size="sm"
        disableCloseButton={false}
      >
        Test Content
      </ModalComponent>,
    );

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });
    fireEvent.click(cancelButton);
    expect(mockFunction).toBeCalled();
  });
});
