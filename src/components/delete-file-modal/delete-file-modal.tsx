import { Typography } from '@mui/material';
import ModalComponent from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-utilities/types';
import {
  allFilesStateSelector,
  deleteFile,
} from '../../redux-utilities/slices/all-files-slice';
import {
  deleteFileModalStateSelector,
  setDeleteFileModalVisibility,
} from '../../redux-utilities/slices/delete-file-modal.slice';

export default function DeleteFileModalComponent() {
  const { index: deleteIndex, isDeleteFileModalVisible } = useSelector(
    deleteFileModalStateSelector,
  );
  const { allFiles } = useSelector(allFilesStateSelector);
  const dispatch = useDispatch<AppDispatch>();

  function handleDelete() {
    dispatch(deleteFile(deleteIndex));
    dispatch(setDeleteFileModalVisibility(false));
  }

  function handleCancel() {
    dispatch(setDeleteFileModalVisibility(false));
  }

  const fileName = (allFiles[deleteIndex] && allFiles[deleteIndex].title) || '';
  return (
    <ModalComponent
      open={isDeleteFileModalVisible}
      modalTitle="Delete file"
      closeButtonTitle="Delete"
      handleClose={handleDelete}
      handleCancel={handleCancel}
      size="sm"
    >
      <Typography variant="body1">
        Are you sure you want to delete the file <b>'{fileName}'</b>?
      </Typography>
    </ModalComponent>
  );
}
