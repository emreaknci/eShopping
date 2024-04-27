import React, { useContext, useState } from 'react';
import './LoginPage.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as MuiLink } from '@mui/material';
import { renderTextField } from '../../../utils/FormUtils';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles';
import { LoginDto } from '../../../dtos/loginDto';
import { AuthContext } from '../../../contexts/AuthContext';


const validationSchema = Yup.object({
  email: Yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: Yup.string().required('Şifre zorunludur'),
});

const LoginPage = () => {
  const authContext = useContext(AuthContext);
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
      login();
      // navigate("/");
    },
  });

  const login = async () => {
    const loginDto: LoginDto = {
      email: formik.values.email,
      password: formik.values.password
    }
    await authContext.login(loginDto);
  }

  return (
    <Container component="main" sx={styles.mainBoxPadding}>
      <Paper elevation={3} style={{
        padding: "1rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
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
