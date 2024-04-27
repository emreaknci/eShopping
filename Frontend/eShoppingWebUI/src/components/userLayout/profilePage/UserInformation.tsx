import { useContext, useEffect, useState } from 'react';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { renderTextField } from '../../../utils/FormUtils';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserDto } from '../../../dtos/userDto';
import { CustomTextFieldComponent } from '../../common/CustomTextFieldComponent';
import UserService from '../../../services/user.service';


const UserInformation = ({ sxValues }: { sxValues: any }) => {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState<UserDto | undefined>();


    const validationSchema = Yup.object({
        firstName: Yup.string().required('Ad zorunludur'),
        lastName: Yup.string().required('Soyad zorunludur'),
        email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email zorunludur'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
        },
        validationSchema,
        onSubmit: (values) => {
            let userUpdated = true;

            if (
                user?.firstName === values.firstName &&
                user?.lastName === values.lastName &&
                user?.email === values.email
            ) {
                userUpdated = false;
            }
            if (userUpdated) {
                setUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                });
                toast.success('Kullanıcı bilgileri güncellendi!');
            }
            setSubmitted(true);
            setEditing(false);
        },
    });

    useEffect(() => {
        const getCurrentUser = async () => {
            await UserService.getCurrentUser().then(res => {
                const userDto: UserDto = {
                    id: res.data.data?.id,
                    email: res.data.data?.email,
                    firstName: res.data.data?.firstName,
                    lastName: res.data.data?.lastName,
                    createdDate: res.data.data?.createdDate,
                    updatedDate: res.data.data?.updatedDate,
                    role: res.data.data?.role

                };
                setUser(userDto);
                formik.setValues({
                    firstName: userDto.firstName,
                    lastName: userDto.lastName,
                    email: userDto.email
                });
            }).catch(err => {
                toast.error(err.response.data?.message);
            })
        }
        if (authContext.isAuthenticated && authContext.isTokenChecked)
            getCurrentUser()
    }, [authContext])


    const [submitted, setSubmitted] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editing) {
            formik.handleSubmit();
        } else {
            handleEdit();
        }
    };


    return (
        <Paper sx={{ ...sxValues }}>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} container justifyContent="center">
                    <AccountCircleIcon style={{ fontSize: "6rem" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" fontWeight={"bold"}>Kullanıcı Bilgileri</Typography>
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {!editing ?
                        <>
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={"bold"}>
                                    Ad: {user?.firstName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={"bold"}>
                                    Soyad: {user?.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>

                                <Typography variant="h6" fontWeight={"bold"}>
                                    Email: {user?.email}
                                </Typography>
                            </Grid>
                        </>
                        : <>
                            <Grid item xs={12}>
                                <CustomTextFieldComponent
                                    formik={formik}
                                    fieldName="firstName"
                                    label="Ad"
                                    type="text"
                                    color={editing ? "success" : "primary"}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <CustomTextFieldComponent
                                    formik={formik}
                                    fieldName="lastName"
                                    label="Soyad"
                                    type="text"
                                    color={editing ? "success" : "primary"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextFieldComponent
                                    formik={formik}
                                    fieldName="email"
                                    label="Email"
                                    type="email"
                                    color={editing ? "success" : "primary"}
                                />
                            </Grid>
                        </>
                    }
                    <Grid item xs={12} sm={12}>
                        <Button type="submit"
                            variant="contained"
                            fullWidth
                            color={editing ? "success" : "primary"}
                            sx={{ color: 'white', fontWeight: 'bold' }}
                        >
                            {editing ? "Kaydet" : "Güncellemek İÇİN TIKLAYINIZ"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default UserInformation;