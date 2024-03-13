import React, { useState } from 'react';
import './LoginPage.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as MuiLink } from '@mui/material';
import { renderTextField } from '../../../utils/FormUtils';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({
  email: Yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: Yup.string().required('Şifre zorunludur'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitted(true);
      // login
      console.log('values:', values);
    },
  });

  return (
    <Container component="main" sx={{ p: { xs: 2, sm: 10, md: 20, lg: 30 }, pt: { xs: 2, sm: 2, md: 2, lg: 2 } }}>
      <Paper elevation={3} style={{ marginTop: "1rem", padding: "1rem", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockOutlinedIcon fontSize={"large"} />
        <Typography component="h1" variant="h5" mt={1}>
          Giriş Yap
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 16 }}>
          {renderTextField(formik, 'email', 'E-posta')}
          {renderTextField(formik, 'password', 'Şifre', 'password')}
          <Typography variant="body2" style={{ marginTop: "1rem", justifyContent: "flex-end" }}>
            Hesabın yok mu?{' '}
            <MuiLink style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
              color="primary">
              Kayıt Ol
            </MuiLink>
          </Typography>
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
            Giriş Yap
          </Button>
        </form>
      </Paper>
    </Container >
  );
};

export default LoginPage;
