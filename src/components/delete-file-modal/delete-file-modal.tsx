import { Typography } from '@mui/material';
import ModalComponent from '../modal/modal';

export default function DeleteFileModalComponent(props: {
  fileName?: string;
  open: boolean;
  handleDelete: () => void;
  handleCancel: () => void;
}) {
  return (
    <ModalComponent
      modalTitle="Delete file"
      closeButtonTitle="Delete"
      handleClose={props.handleDelete}
      size='sm'
      {...props}
    >
      <Typography variant="body1">
        Are you sure you want to delete the file <b>'{props.fileName}'</b>?
      </Typography>
    </ModalComponent>
  );
}
