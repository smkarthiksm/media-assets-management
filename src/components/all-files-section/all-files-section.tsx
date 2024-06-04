import './all-files-section.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-utilities/types';
import {
  allFilesStateSelector,
  deleteFile,
  fetchAllFiles,
  searchByInput,
  updateAllFiles,
  updateFile,
} from '../../redux-utilities/slices/all-files-slice';
import { loaderStateSelector } from '../../redux-utilities/slices/loader-slice';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditFileModalComponent from '../edit-file-modal/edit-file-modal';
import { AllFile } from '../../stubbs/files';
import {
  editFileModalStateSelector,
  setEditFileModalVisibility,
  updateEditFileModalFields,
  setEditFileModalIndex,
} from '../../redux-utilities/slices/edit-file-modal.slice';
import DeleteFileModalComponent from '../delete-file-modal/delete-file-modal';
import {
  deleteFileModalStateSelector,
  setDeleteFileModalIndex,
  setDeleteFileModalVisibility,
} from '../../redux-utilities/slices/delete-file-modal.slice';
import UploadFileModalComponent from '../upload-file-modal/upload-file-modal';
import {
  setUploadFileModalVisibility,
  uploadFileModalStateSelector,
} from '../../redux-utilities/slices/upload-file-modal.slice';
import { fileUploadStepperStateSelector, resetFileUploadStepper } from '../../redux-utilities/slices/file-upload-stepper-slice';

export default function AllSectionComponent() {
  const { allFiles, searchValue } = useSelector(allFilesStateSelector);
  const { isLoaderVisible } = useSelector(loaderStateSelector);
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

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  function handleEditFile(file: AllFile, index: number) {
    dispatch(updateEditFileModalFields({ prop: 'title', value: file.title }));
    dispatch(updateEditFileModalFields({ prop: 'album', value: file.album }));
    dispatch(updateEditFileModalFields({ prop: 'artist', value: file.artist }));
    dispatch(setEditFileModalIndex(index));
    dispatch(setEditFileModalVisibility(true));
  }

  function handleEditFileSave() {
    dispatch(updateFile({ album, artist, index: editIndex, title }));
    dispatch(setEditFileModalVisibility(false));
  }

  function handleDeleteFile(file: AllFile, index: number) {
    dispatch(setDeleteFileModalIndex(index));
    dispatch(setDeleteFileModalVisibility(true));
  }

  function handleDeleteFileSave() {
    dispatch(deleteFile(deleteIndex));
    dispatch(setDeleteFileModalVisibility(false));
  }

  function handleFileUpload() {
    dispatch(updateAllFiles(files));
    dispatch(setUploadFileModalVisibility(false));
  }

  return (
    <>
      {isLoaderVisible ? null : (
        <Grid container padding={4} rowGap={2}>
          <Grid container item xs={12}>
            <Typography variant="h6" component="div">
              Manage your files
            </Typography>
          </Grid>
          <Grid container justifyContent={'space-between'}>
            <Grid item xs={6}>
              <TextField
                placeholder="Search by title, album, artist"
                variant="outlined"
                className="input-field"
                value={searchValue}
                onChange={(e) => dispatch(searchByInput(e.target.value))}
              />
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => {
                  dispatch(resetFileUploadStepper());
                  dispatch(setUploadFileModalVisibility(true));
                }}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
          <Grid container item>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Album</TableCell>
                    <TableCell>Artist</TableCell>
                    <TableCell align="center">Duration</TableCell>
                    <TableCell>File type</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allFiles.map((file, index) => (
                    <TableRow key={index + 1}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{file.title}</TableCell>
                      <TableCell>{file.album || 'N/A'}</TableCell>
                      <TableCell>{file.artist}</TableCell>
                      <TableCell align="center">{file.duration}</TableCell>
                      <TableCell>
                        {file.fileType === 'audio' ? (
                          <AudioFileIcon color="primary" />
                        ) : (
                          <VideoFileIcon color="secondary" />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => handleEditFile(file, index)}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          className="mx-4"
                          onClick={() => handleDeleteFile(file, index)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!allFiles.length ? (
                    <TableRow>
                      <TableCell colSpan={7} align='center'>No records found</TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
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
            fileName={
              (allFiles[deleteIndex] && allFiles[deleteIndex].title) || ''
            }
            open={isDeleteFileModalVisible}
            handleDelete={handleDeleteFileSave}
            handleCancel={() => dispatch(setDeleteFileModalVisibility(false))}
          />
        </Grid>
      )}
    </>
  );
}
