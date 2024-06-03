import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-utilities/types';
import {
  allFilesStateSelector,
  deleteFile,
  fetchAllFiles,
  searchByInput,
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

import './all-files-section.scss';
import EditModalComponent from '../edit-modal/edit-modal';
import { AllFile } from '../../stubbs/files';
import {
  editModalStateSelector,
  setEditModalVisibility,
  updateEditModalFields,
  setEditModalIndex,
} from '../../redux-utilities/slices/edit-modal.slice';
import DeleteModalComponent from '../delete-modal/delete-modal';
import {
  deleteModalStateSelector,
  setDeleteModalIndex,
  setDeleteModalVisibility,
} from '../../redux-utilities/slices/delete-modal.slice';

export default function AllSectionComponent() {
  const { allFiles, searchValue } = useSelector(allFilesStateSelector);
  const { isLoaderVisible } = useSelector(loaderStateSelector);
  const {
    index: editIndex,
    album,
    artist,
    title,
    isEditModalVisible,
  } = useSelector(editModalStateSelector);
  const { index: deleteIndex, isDeleteModalVisible } = useSelector(
    deleteModalStateSelector,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  function handleEditFile(file: AllFile, index: number) {
    dispatch(updateEditModalFields({ prop: 'title', value: file.title }));
    dispatch(updateEditModalFields({ prop: 'album', value: file.album }));
    dispatch(updateEditModalFields({ prop: 'artist', value: file.artist }));
    dispatch(setEditModalIndex(index));
    dispatch(setEditModalVisibility(true));
  }

  function handleEditFileSave() {
    dispatch(updateFile({ album, artist, index: editIndex, title }));
    dispatch(setEditModalVisibility(false));
  }

  function handleDeleteFile(file: AllFile, index: number) {
    dispatch(setDeleteModalIndex(index));
    dispatch(setDeleteModalVisibility(true));
  }

  function handleDeleteFileSave() {
    dispatch(deleteFile(deleteIndex));
    dispatch(setDeleteModalVisibility(false));
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
              <Button variant="contained" endIcon={<AddIcon />}>
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
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <EditModalComponent
            open={isEditModalVisible}
            handleSave={handleEditFileSave}
            handleCancel={() => dispatch(setEditModalVisibility(false))}
          />
          <DeleteModalComponent
            fileName={
              (allFiles[deleteIndex] && allFiles[deleteIndex].title) || ''
            }
            open={isDeleteModalVisible}
            handleDelete={handleDeleteFileSave}
            handleCancel={() => dispatch(setDeleteModalVisibility(false))}
          />
        </Grid>
      )}
    </>
  );
}
