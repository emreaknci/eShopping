import React, { useEffect, useState } from 'react';
import './AddNewAdminPage.css';
import * as Yup from 'yup';
import { CustomTextFieldComponent } from '../../../../components/common/CustomTextFieldComponent';
import { CustomTextAreaComponent } from '../../../../components/common/CustomTextAreaComponent';
import { useFormik } from 'formik';
import { Grid, Paper, Typography, Button, Select, MenuItem } from '@mui/material';
import { ImagePickerComponent } from '../../../../components/common/ImagePickerComponent';
import categories from '../../../../mock/category';
import AuthService from '../../../../services/auth.service';
import { RegisterDto } from '../../../../dtos/registerDto';
import { toast } from 'react-toastify';
import UserService from '../../../../services/user.service';
import { Role } from '../../../../models/role';
import { UserDto } from '../../../../dtos/userDto';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Ad alanı zorunludur'),
  lastName: Yup.string().required('Soyad alanı zorunludur'),
  email: Yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: Yup.string().required('Şifre zorunludur'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre onayı zorunludur'),
});

const sxValues = {
  p: 2,
  m: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const AddNewAdminPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState<UserDto[]>();
  const [selectedUser, setSelectedUser] = useState<UserDto>();
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    getOtherUsers();
  }, [])

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
      await registerAsAnAdmin();
    },
  });

  const registerAsAnAdmin = async () => {
    const registerDto: RegisterDto = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword
    }
    const result = await AuthService.registerAsAnAdmin(registerDto);
    if (result.data?.success) {
      toast.success('Kullanıcı başarıyla oluşturuldu.');
    }
    else {
      toast.error(result.data?.message || 'Kullanıcı oluşturulurken bir hata oluştur. Lütfen daha sonra tekrar deneyin.');
    }
  }

  const getOtherUsers = async () => {
    await UserService.getAllByRole(Role.User).then((res) => {
      const result = res.data;
      setUsers(result.data!);
    }
    ).catch((err) => {
      setIsNew(true);
      setUsers(undefined);
    });
  }

  const grantAuth = async (userId: number) => {
    const result = await AuthService.grantAuth(userId);
    console.log('result', result.data)
    if (result.data?.success) {
      toast.success(`"${selectedUser?.firstName} ${selectedUser?.lastName}" adlı kullanıcıya yetki verildi.`);
      setUsers(users?.filter(user => user.id !== userId));
      if (users?.filter(user => user.id !== userId)?.length == 0)
        setIsNew(true);
      setSelectedUser(undefined);
    }
    else {
      toast.error(result.data?.message || 'Yetki verilirken bir hata oluştur. Lütfen daha sonra tekrar deneyin.');
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isNew) {
      formik.handleSubmit();
    }
    else {
      if (!selectedUser) {
        toast.error('Kullanıcı seçiniz.');
        return;
      }
      await grantAuth(selectedUser!.id!);
    }
  }

  const handleSelectedUserChange = (e: any) => {
    setSelectedUser(users?.find(user => user.id === e.target.value));
  }


  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={10} lg={6} >
        <Paper sx={{ ...sxValues }}>
          <form onSubmit={handleSubmit} >
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <Grid container spacing={3} >
                  <Grid item xs={12} sm={6}>
                    <Typography variant='h4'>Adminler</Typography>
                  </Grid>

                  {users && users.length > 0 &&
                    <Grid item xs={12} sm={6} sx={{ pt: { xs: 2, sm: 0 } }}>
                      <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                        color="primary" onClick={() => setIsNew(prev => !prev)} >
                        {!isNew ? 'Yeni Admin Kullanıcısı Oluştur' : 'Mevcut Kullanıcıyı Seç'}
                      </Button>
                    </Grid>
                  }
                </Grid>
              </Grid>
              {!isNew && users && users.length > 0 && <Grid item xs={12} >
                <Typography variant='h6'>Mevcut Kullanıcı Seç</Typography>
                <br />
                <Select
                  labelId="other-user-select-label"
                  id="other-user-select"
                  variant='standard'
                  label="Kullanıcı"
                  fullWidth
                  onChange={handleSelectedUserChange}
                >
                  {users && users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>}
              {isNew && <>
                <Grid item xs={12} >
                  <Typography variant='h6'>Yeni Admin Kullanıcısı Oluştur</Typography>

                  <CustomTextFieldComponent formik={formik} fieldName='firstName' label="Adı" />
                </Grid>
                <Grid item xs={12} >
                  <CustomTextFieldComponent formik={formik} fieldName='lastName' label="Soyadı" />
                </Grid>
                <Grid item xs={12} >
                  <CustomTextFieldComponent formik={formik} fieldName='email' label="Email" />
                </Grid>
                <Grid item xs={12} >
                  <CustomTextFieldComponent formik={formik} fieldName='password' label="Şifre" type="password" />
                </Grid>
                <Grid item xs={12} >
                  <CustomTextFieldComponent formik={formik} fieldName='confirmPassword' label="Şifre Tekrar" type="password" />
                </Grid>
              </>}
              <Grid item xs={12} sx={{ pt: { xs: 2, sm: 0 } }}>
                <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                  color="primary" type="submit" onClick={() => console.log(formik.errors)} >
                  Admin Ekle
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddNewAdminPage;

