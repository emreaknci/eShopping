import React from 'react';
import './DialogComponent.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export interface DialogComponentProps {
  open: any,
  handleClose: any,
  handleConfirm: any,
  text: any,
}


const DialogComponent = (props: DialogComponentProps) => {
  return (
    <Dialog open={Boolean(open)} onClose={props.handleClose}>
      <DialogTitle>{"Uyarı"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          İptal
        </Button>
        <Button onClick={props.handleConfirm} color="primary">
          Kaldır
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
