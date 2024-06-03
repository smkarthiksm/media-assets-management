import { Grid, TextField } from '@mui/material';
import ModalComponent from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  editModalStateSelector,
  updateFields,
} from '../../redux-utilities/slices/edit-modal.slice';
import { AppDispatch } from '../../redux-utilities/types';
import { ChangeEvent } from 'react';

export default function EditModalComponent(props: {
  open: boolean;
  handleSave: () => void;
}) {
  const { album, artist, title } = useSelector(editModalStateSelector);
  const dispatch = useDispatch<AppDispatch>();

  function handleFieldUpdate(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateFields({ prop: e.target.name, value: e.target.value }));
  }
  function disableSaveButton() {
    return !album || !artist || !title;
  }
  return (
    <ModalComponent
      modalTitle="Edit file metadata"
      closeButtonTitle="Save"
      disableCloseButton={disableSaveButton()}
      handleClose={props.handleSave}
      {...props}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} marginTop={1}>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={title}
            fullWidth
            onChange={handleFieldUpdate}
            required
            error={!title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Album"
            name="album"
            variant="outlined"
            value={album}
            fullWidth
            required
            onChange={handleFieldUpdate}
            error={!album}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Artist"
            name="artist"
            variant="outlined"
            value={artist}
            fullWidth
            required
            onChange={handleFieldUpdate}
            error={!artist}
          />
        </Grid>
      </Grid>
    </ModalComponent>
  );
}
