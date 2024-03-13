// FormUtils.ts

import { TextField } from '@mui/material';
import { useFormik } from 'formik';


export const renderTextField = (formik: any, fieldName: any, label: string, type = 'text') => (
  <TextField
    fullWidth
    margin="normal"
    id={fieldName}
    name={fieldName}
    label={label}
    type={type}
    variant="outlined"
    autoComplete={fieldName === 'password' || fieldName === 'confirmPassword' ? 'new-password' : 'off'}
    value={formik.values[fieldName]}
    onChange={formik.handleChange}
    error={(formik.touched[fieldName]) && Boolean(formik.errors[fieldName])}
    helperText={(formik.touched[fieldName]) && formik.errors[fieldName]}
  />
);
