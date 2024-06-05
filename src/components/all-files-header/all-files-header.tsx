import './all-files-header.scss';
import { Button, Grid, TextField, Typography } from '@mui/material';
import {
  allFilesStateSelector,
  searchByInput,
} from '../../redux-utilities/slices/all-files-slice';
import { resetFileUploadStepper } from '../../redux-utilities/slices/file-upload-stepper-slice';
import { setUploadFileModalVisibility } from '../../redux-utilities/slices/upload-file-modal.slice';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-utilities/types';

export default function AllFilesHeaderComponent() {
  const { searchValue } = useSelector(allFilesStateSelector);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
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
    </>
  );
}
