import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material';
import { ReactNode } from 'react';

export default function ModalComponent(props: {
  open: boolean;
  modalTitle: string;
  closeButtonTitle: string;
  handleClose: () => void;
  handleCancel: () => void;
  children: ReactNode;
  disableCloseButton?: boolean;
}) {
  const handleClose: DialogProps['onClose'] = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.modalTitle}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel}>Cancel</Button>
        <Button onClick={props.handleClose} disabled={props.disableCloseButton}>
          {props.closeButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
