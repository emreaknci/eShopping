import React from 'react';
import './CustomTextAreaComponent.css';
import { TextareaAutosize as TextArea } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';

interface CustomTextAreaComponentProps {
  formik: any,
  fieldName: string,
  label?: string,
}

const CustomTextAreaComponent = (props: CustomTextAreaComponentProps) => {

  const theme = useTheme();

  return (
    <TextArea style={{
      width: '100%',
      padding: '1rem',
      outline: 'none',
      resize: 'none',
      borderRadius: '1rem',
      borderBottom: `.2rem solid ${theme.palette.divider}`,
      border:"none",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
    }}
      minRows={2}
      placeholder={props.label}
      value={props.formik.values[props.fieldName]}
      onChange={props.formik.handleChange}
      name={props.fieldName}
    />
  );
};

export default CustomTextAreaComponent;
