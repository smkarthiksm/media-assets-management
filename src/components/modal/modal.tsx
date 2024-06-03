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
  modalTitle: string;
  closeButtonTitle: string;
  open: boolean;
  handleClose: () => void;
  disableCloseButton: boolean;
  children: ReactNode;
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
        <Button onClick={props.handleClose} disabled={props.disableCloseButton}>
          {props.closeButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
