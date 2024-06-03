import { Typography } from '@mui/material';
import ModalComponent from '../modal/modal';

export default function DeleteModalComponent(props: {
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
      {...props}
    >
      <Typography variant="body1">
        Are you sure you want to delete the file <b>'{props.fileName}'</b>?
      </Typography>
    </ModalComponent>
  );
}
