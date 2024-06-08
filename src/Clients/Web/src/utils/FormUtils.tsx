// FormUtils.ts

import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { TextFieldPropsColorOverrides } from '@mui/material/TextField';


export const renderTextField =


  (formik: any,
    fieldName: any,
    label: string,
    type = 'text',
    value: any | null = null,
    disabled = false,
    readonly = false,
    color: TextFieldPropsColorOverrides = "primary"
  ) => (
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
      disabled={disabled}
      InputProps={{ readOnly: readonly }}
      color={color as "primary" | "error" | "secondary" | "info" | "success" | "warning"}
    />
  );
