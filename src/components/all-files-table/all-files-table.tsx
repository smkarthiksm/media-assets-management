import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { allFilesStateSelector } from '../../redux-utilities/slices/all-files-slice';
import { AppDispatch } from '../../redux-utilities/types';
import { AllFile } from '../../stubs/files';
import {
  setEditFileModalIndex,
  setEditFileModalVisibility,
  updateEditFileModalFields,
} from '../../redux-utilities/slices/edit-file-modal.slice';
import {
  setDeleteFileModalIndex,
  setDeleteFileModalVisibility,
} from '../../redux-utilities/slices/delete-file-modal.slice';

export default function AllFilesTableComponent() {
  const { allFiles } = useSelector(allFilesStateSelector);

  const dispatch = useDispatch<AppDispatch>();

  function handleEditFile(file: AllFile, index: number) {
    dispatch(updateEditFileModalFields({ prop: 'title', value: file.title }));
    dispatch(updateEditFileModalFields({ prop: 'album', value: file.album }));
    dispatch(updateEditFileModalFields({ prop: 'artist', value: file.artist }));
    dispatch(setEditFileModalIndex(index));
    dispatch(setEditFileModalVisibility(true));
  }
  function handleDeleteFile(file: AllFile, index: number) {
    dispatch(setDeleteFileModalIndex(index));
    dispatch(setDeleteFileModalVisibility(true));
  }

  return (
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
              <TableCell colSpan={7} align="center">
                No records found
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
