import ModalComponent from '../modal/modal';
import FileUploadStepperComponent from '../file-upload-stepper/file-upload-stepper';
import { useSelector } from 'react-redux';
import { fileUploadStepperStateSelector } from '../../redux-utilities/slices/file-upload-stepper-slice';
import { areFilesInValid } from '../utilities/utility';

export default function UploadFileModalComponent(props: {
  open: boolean;
  handleUpload: () => void;
  handleCancel: () => void;
}) {
  const { files } = useSelector(fileUploadStepperStateSelector);
  const isInvalid = areFilesInValid(files);
  return (
    <ModalComponent
      modalTitle="Upload files"
      closeButtonTitle="Upload"
      handleClose={props.handleUpload}
      size="md"
      disableCloseButton={isInvalid}
      {...props}
    >
      <FileUploadStepperComponent />
    </ModalComponent>
  );
}
