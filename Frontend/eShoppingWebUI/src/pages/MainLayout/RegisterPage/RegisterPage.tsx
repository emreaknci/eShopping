import React, { useState } from 'react';
import './RegisterPage.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as MuiLink } from '@mui/material';
import { renderTextField } from '../../../utils/FormUtils';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles';
import AuthService from '../../../services/auth.service';
import { RegisterDto } from '../../../dtos/registerDto';
import { toast } from 'react-toastify';
import { CustomTextFieldComponent } from '../../../components/common/CustomTextFieldComponent';


const validationSchema = Yup.object({
  firstName: Yup.string().required('Ad alanı zorunludur'),
  lastName: Yup.string().required('Soyad alanı zorunludur'),
  email: Yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: Yup.string().required('Şifre zorunludur'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre onayı zorunludur'),
});


const RegisterPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitted(true);
      await register();
    },
  });

  const register = async () => {
    const registerDto: RegisterDto = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword
    }
    await AuthService.register(registerDto).then(res => {
      console.log(res.data)
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
    }).catch(err => {
      toast.error(err.response.data?.message);
    })
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
          Kayıt Ol
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 16 }}>
          <CustomTextFieldComponent formik={formik} fieldName='firstName' label='Ad' />
          <CustomTextFieldComponent formik={formik} fieldName='lastName' label='Soyad' />
          <CustomTextFieldComponent formik={formik} fieldName='email' label='E-posta'/>
          <CustomTextFieldComponent formik={formik} fieldName='password' label='Şifre' type='password'/>
          <CustomTextFieldComponent formik={formik} fieldName='confirmPassword' label='Şifre Onayı' type='password'/>
          <Typography variant="body2" style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
            Zaten bir hesabın var mı?{' '}
            <MuiLink style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
              color="primary">
              Giriş Yap
            </MuiLink>
          </Typography>
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
            Kayıt Ol
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
