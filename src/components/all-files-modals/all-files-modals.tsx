import { useDispatch, useSelector } from 'react-redux';
import {
  allFilesStateSelector,
  deleteFile,
  updateAllFiles,
  updateFile,
} from '../../redux-utilities/slices/all-files-slice';
import {
  deleteFileModalStateSelector,
  setDeleteFileModalVisibility,
} from '../../redux-utilities/slices/delete-file-modal.slice';
import {
  editFileModalStateSelector,
  setEditFileModalVisibility,
} from '../../redux-utilities/slices/edit-file-modal.slice';
import {
  setUploadFileModalVisibility,
  uploadFileModalStateSelector,
} from '../../redux-utilities/slices/upload-file-modal.slice';
import UploadFileModalComponent from '../upload-file-modal/upload-file-modal';
import { fileUploadStepperStateSelector } from '../../redux-utilities/slices/file-upload-stepper-slice';
import { AppDispatch } from '../../redux-utilities/types';
import EditFileModalComponent from '../edit-file-modal/edit-file-modal';
import DeleteFileModalComponent from '../delete-file-modal/delete-file-modal';

export default function AllFilesModalsComponent() {
  const { allFiles } = useSelector(allFilesStateSelector);
  const {
    index: editIndex,
    album,
    artist,
    title,
    isEditFileModalVisible,
  } = useSelector(editFileModalStateSelector);
  const { index: deleteIndex, isDeleteFileModalVisible } = useSelector(
    deleteFileModalStateSelector,
  );
  const { isUploadFileModalVisible } = useSelector(
    uploadFileModalStateSelector,
  );
  const { files } = useSelector(fileUploadStepperStateSelector);

  const dispatch = useDispatch<AppDispatch>();

  function handleFileUpload() {
    dispatch(updateAllFiles(files));
    dispatch(setUploadFileModalVisibility(false));
  }

  function handleEditFileSave() {
    dispatch(updateFile({ album, artist, index: editIndex, title }));
    dispatch(setEditFileModalVisibility(false));
  }
  function handleDeleteFileSave() {
    dispatch(deleteFile(deleteIndex));
    dispatch(setDeleteFileModalVisibility(false));
  }

  return (
    <>
      <UploadFileModalComponent
        open={isUploadFileModalVisible}
        handleUpload={handleFileUpload}
        handleCancel={() => dispatch(setUploadFileModalVisibility(false))}
      />
      <EditFileModalComponent
        open={isEditFileModalVisible}
        handleSave={handleEditFileSave}
        handleCancel={() => dispatch(setEditFileModalVisibility(false))}
      />
      <DeleteFileModalComponent
        fileName={(allFiles[deleteIndex] && allFiles[deleteIndex].title) || ''}
        open={isDeleteFileModalVisible}
        handleDelete={handleDeleteFileSave}
        handleCancel={() => dispatch(setDeleteFileModalVisibility(false))}
      />
    </>
  );
}
