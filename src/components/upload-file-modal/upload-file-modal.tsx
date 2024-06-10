import ModalComponent from '../modal/modal';
import FileUploadStepperComponent from '../file-upload-stepper/file-upload-stepper';
import { useDispatch, useSelector } from 'react-redux';
import { fileUploadStepperStateSelector } from '../../redux-utilities/slices/file-upload-stepper-slice';
import { areFilesInValid } from '../../utilities/utility';
import { AppDispatch } from '../../redux-utilities/types';
import { updateAllFiles } from '../../redux-utilities/slices/all-files-slice';
import {
  setUploadFileModalVisibility,
  uploadFileModalStateSelector,
} from '../../redux-utilities/slices/upload-file-modal.slice';

export default function UploadFileModalComponent() {
  const { files } = useSelector(fileUploadStepperStateSelector);
  const { isUploadFileModalVisible } = useSelector(
    uploadFileModalStateSelector,
  );

  const isInvalid = areFilesInValid(files);

  const dispatch = useDispatch<AppDispatch>();

  function handleFileUpload() {
    dispatch(updateAllFiles(files));
    dispatch(setUploadFileModalVisibility(false));
  }

  return (
    <ModalComponent
      open={isUploadFileModalVisible}
      modalTitle="Upload files"
      closeButtonTitle="Upload"
      handleClose={handleFileUpload}
      handleCancel={() => dispatch(setUploadFileModalVisibility(false))}
      size="md"
      disableCloseButton={isInvalid}
    >
      <FileUploadStepperComponent />
    </ModalComponent>
  );
}
