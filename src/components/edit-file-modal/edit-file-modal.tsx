import { Grid, TextField } from '@mui/material';
import ModalComponent from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  editFileModalStateSelector,
  setEditFileModalVisibility,
  updateEditFileModalFields,
} from '../../redux-utilities/slices/edit-file-modal.slice';
import { AppDispatch } from '../../redux-utilities/types';
import { ChangeEvent } from 'react';
import { updateFile } from '../../redux-utilities/slices/all-files-slice';

export default function EditFileModalComponent() {
  const {
    isEditFileModalVisible,
    index: editIndex,
    album,
    artist,
    title,
  } = useSelector(editFileModalStateSelector);

  const dispatch = useDispatch<AppDispatch>();

  function handleEditFileSave() {
    dispatch(updateFile({ album, artist, index: editIndex, title }));
    dispatch(setEditFileModalVisibility(false));
  }

  function handleFieldUpdate(e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateEditFileModalFields([
        { prop: e.target.name, value: e.target.value },
      ]),
    );
  }

  function disableSaveButton() {
    return !album || !artist || !title;
  }
  return (
    <ModalComponent
      open={isEditFileModalVisible}
      modalTitle="Edit file metadata"
      closeButtonTitle="Save"
      disableCloseButton={disableSaveButton()}
      handleClose={handleEditFileSave}
      handleCancel={() => dispatch(setEditFileModalVisibility(false))}
      size="md"
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
