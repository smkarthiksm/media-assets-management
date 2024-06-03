import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-utilities/types';
import {
  allFilesStateSelector,
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
  setIndex,
  setVisibility,
  updateFields,
} from '../../redux-utilities/slices/edit-modal.slice';

export default function AllSectionComponent() {
  const { allFiles, searchValue } = useSelector(allFilesStateSelector);
  const { isLoaderVisible } = useSelector(loaderStateSelector);
  const { index, album, artist, title, isVisible } = useSelector(
    editModalStateSelector,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  function handleEditFile(file: AllFile, index: number) {
    dispatch(updateFields({ prop: 'title', value: file.title }));
    dispatch(updateFields({ prop: 'album', value: file.album }));
    dispatch(updateFields({ prop: 'artist', value: file.artist }));
    dispatch(setIndex(index));
    dispatch(setVisibility(true));
  }

  function handleEditFileSave() {
    dispatch(updateFile({ album, artist, index, title }));
    dispatch(setVisibility(false));
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
                        <IconButton size="small" color="error" className="mx-4">
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
            open={isVisible}
            handleSave={handleEditFileSave}
          />
        </Grid>
      )}
    </>
  );
}
