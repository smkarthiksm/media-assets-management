import {
  Breakpoint,
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
  size: Breakpoint;
}) {
  const handleClose: DialogProps['onClose'] = (event, reason) => {
    if (reason !== 'backdropClick') {
      props.handleClose();
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      fullWidth
      maxWidth={props.size}
    >
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
