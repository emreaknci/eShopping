import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { SnackBarContext } from '../../../contexts/SnackBarContext';

export interface SnackBarComponentProps {
  open: boolean;
  message: string;
  alertType: AlertColor;
  closeSnackBar: () => void;
}


const SnackBarComponent = (props: SnackBarComponentProps) => {

  const handleClose = (event?: any, reason?: any) => {
    if (reason === 'clickaway') {
      return;
    }
    props.closeSnackBar();
  };
  const handleAlertClick = () => {
    props.closeSnackBar();
  };

  return (
    <Snackbar open={props.open} autoHideDuration={2000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={props.alertType}
        variant="filled"
        sx={{ width: '100%' }}
        onClick={handleAlertClick}

      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
