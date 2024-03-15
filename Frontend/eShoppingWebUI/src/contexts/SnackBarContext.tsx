import React, { createContext, useState, useContext } from 'react';
import { SnackBarComponent } from '../components/common/SnackBarComponent';
import { AlertColor } from '@mui/material/Alert';

export const SnackBarContext = createContext({
    open: false,
    message: '',
    alertType: "success",
    openSnackBar: (newMessage: string, newAlertType: AlertColor) => { },
    closeSnackBar: () => { },
});

export const SnackBarProvider = ({ children }: { children: any }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('success' as AlertColor);

    const openSnackBar = (newMessage: string, newAlertType: AlertColor) => {
        setMessage(newMessage);
        setAlertType(newAlertType);
        setOpen(true);
    };

    const closeSnackBar = () => {
        setOpen(false);
    };

    return (
        <SnackBarContext.Provider value={{ open, message, alertType: "info" as AlertColor, openSnackBar, closeSnackBar }}>
            {children}
            <SnackBarComponent
                alertType={alertType}
                closeSnackBar={closeSnackBar}
                message={message}
                open={open}
                key={message}
            />
        </SnackBarContext.Provider>
    );
};

