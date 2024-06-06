import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import { fireEvent, screen } from '@testing-library/react';
import FileUploadStepperComponent from '../../components/file-upload-stepper/file-upload-stepper';
import sampleAudioFile from '../sample-files-for-testing/sample-audio.mp3';
import userEvent from '@testing-library/user-event';
import { allFilesStateStub } from '../stubs/all-files-state.stub';

describe('FileUploadStepperComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<FileUploadStepperComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should temporarily store all the files in the state that were selected in the file uploader', async () => {
    const { container, store } = renderWithProviders(
      <FileUploadStepperComponent />,
    );
    // mock DOM createElement API to mock eventListener
    global.URL.createObjectURL = jest.fn(() => 'random_id');
    const mockAudioElement = document.createElement('audio');
    mockAudioElement.addEventListener = (type: string, handler: any) =>
      handler();

    const mockFunction = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockAudioElement);

    const files = [
      new File([sampleAudioFile], 'sample-file-1.mp3', {
        type: 'audio/mp3',
      }),
      new File([sampleAudioFile], 'sample-file-2.mp3', {
        type: 'audio/mp3',
      }),
    ];
    const fileInput = container.getElementsByClassName(
      'file-input',
    )[0] as HTMLInputElement;

    expect(store.getState().fileUploadStepper.files).toHaveLength(0);
    await userEvent.upload(fileInput, files);
    expect(store.getState().fileUploadStepper.files).toHaveLength(2);
    mockFunction.mockRestore();
  });

  test(`should update first file's text fields in the next step after files are selected`, async () => {
    const { store } = renderWithProviders(<FileUploadStepperComponent />, {
      preloadedState: {
        fileUploadStepper: {
          activeStep: 1,
          files: allFilesStateStub.allFiles,
        },
      },
    });
    const titleTextField = screen.getAllByRole('textbox', { name: 'Title' })[0];
    const albumTextField = screen.getAllByRole('textbox', { name: 'Album' })[0];
    const artistTextField = screen.getAllByRole('textbox', {
      name: 'Artist',
    })[0];
    expect(store.getState().fileUploadStepper.files[0].title).toEqual(
      'testTitle1',
    );
    expect(store.getState().fileUploadStepper.files[0].album).toEqual(
      'testAlbum1',
    );
    expect(store.getState().fileUploadStepper.files[0].artist).toEqual(
      'testArtist1',
    );
    fireEvent.change(titleTextField, {
      target: { value: 'Updated new file title' },
    });
    fireEvent.change(albumTextField, {
      target: { value: 'Updated new file album' },
    });
    fireEvent.change(artistTextField, {
      target: { value: 'Updated new file artist' },
    });
    expect(store.getState().fileUploadStepper.files[0].title).toEqual(
      'Updated new file title',
    );
    expect(store.getState().fileUploadStepper.files[0].album).toEqual(
      'Updated new file album',
    );
    expect(store.getState().fileUploadStepper.files[0].artist).toEqual(
      'Updated new file artist',
    );
  });

  test(`should remove the second file from the files selected to upload`, async () => {
    const { store } = renderWithProviders(<FileUploadStepperComponent />, {
      preloadedState: {
        fileUploadStepper: {
          activeStep: 1,
          files: allFilesStateStub.allFiles,
        },
      },
    });
    const deleteButton = screen.getAllByRole('button', { name: 'Remove' })[1];
    expect(store.getState().fileUploadStepper.files).toHaveLength(2);
    fireEvent.click(deleteButton);
    expect(store.getState().fileUploadStepper.files).toHaveLength(1);
    expect(store.getState().fileUploadStepper.files).toEqual([
      allFilesStateStub.allFiles[0],
    ]);
  });

  test(`should go to first step if all files are removed that were selected to upload`, async () => {
    const { store } = renderWithProviders(<FileUploadStepperComponent />, {
      preloadedState: {
        fileUploadStepper: {
          activeStep: 1,
          files: [allFilesStateStub.allFiles[0]],
        },
      },
    });
    expect(store.getState().fileUploadStepper.files).toHaveLength(1);
    const deleteButton = screen.getAllByRole('button', { name: 'Remove' })[0];
    fireEvent.click(deleteButton);
    expect(store.getState().fileUploadStepper.files).toHaveLength(0);
    expect(store.getState().fileUploadStepper.activeStep).toEqual(0);
  });

  test(`should go to step 1 when back button is clicked`, async () => {
    const { store } = renderWithProviders(<FileUploadStepperComponent />, {
      preloadedState: {
        fileUploadStepper: {
          activeStep: 1,
          files: allFilesStateStub.allFiles,
        },
      },
    });
    const backButton = screen.getByRole('button', { name: 'Back' });
    expect(store.getState().fileUploadStepper.activeStep).toEqual(1);
    fireEvent.click(backButton);
    expect(store.getState().fileUploadStepper.activeStep).toEqual(0);
  });

  test(`should disable next button when no files are selected to upload`, async () => {
    renderWithProviders(<FileUploadStepperComponent />, {
      preloadedState: {
        fileUploadStepper: {
          activeStep: 0,
          files: [],
        },
      },
    });
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  test(`should go to next step when files are selected to upload and next button is clicked`, async () => {
    const { store } = renderWithProviders(<FileUploadStepperComponent />, {
      preloadedState: {
        fileUploadStepper: {
          activeStep: 0,
          files: allFilesStateStub.allFiles,
        },
      },
    });
    expect(store.getState().fileUploadStepper.activeStep).toEqual(0);
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    expect(store.getState().fileUploadStepper.activeStep).toEqual(1);
  });
});
