import { Typography } from '@mui/material';
import ModalComponent from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-utilities/types';
import { deleteFile } from '../../redux-utilities/slices/all-files-slice';
import {
  deleteFileModalStateSelector,
  setDeleteFileModalVisibility,
} from '../../redux-utilities/slices/delete-file-modal.slice';

export default function DeleteFileModalComponent() {
  const {
    index: deleteIndex,
    isDeleteFileModalVisible,
    fileName,
  } = useSelector(deleteFileModalStateSelector);
  const dispatch = useDispatch<AppDispatch>();

  function handleDelete() {
    dispatch(deleteFile(deleteIndex));
    dispatch(setDeleteFileModalVisibility(false));
  }

  function handleCancel() {
    dispatch(setDeleteFileModalVisibility(false));
  }

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
