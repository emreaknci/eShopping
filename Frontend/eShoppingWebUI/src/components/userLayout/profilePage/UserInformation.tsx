import { useContext, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { renderTextField } from '../../../utils/FormUtils';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { SnackBarContext } from '../../../contexts/SnackBarContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserInformation = ({ sxValues }: { sxValues: any }) => {
    const snackBarContext = useContext(SnackBarContext);
    const [user, setUser] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        phone: '123-456-7890',
    });
    const [submitted, setSubmitted] = useState(false);
    const [editing, setEditing] = useState(false);
    const validationSchema = Yup.object({
        firstName: Yup.string().required('Ad zorunludur'),
        lastName: Yup.string().required('Soyad zorunludur'),
        phone: Yup.string().required('Telefon zorunludur'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
        },
        validationSchema,
        onSubmit: (values) => {
            let userUpdated = true;

            if (
                user.firstName === values.firstName &&
                user.lastName === values.lastName &&
                user.email === values.email &&
                user.phone === values.phone
            ) {
                userUpdated = false;
            }
            if (userUpdated) {
                setUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                });
                snackBarContext.openSnackBar('Kullanıcı bilgileri güncellendi!', 'success');
            }
            setSubmitted(true);
            setEditing(false);
        },
    });
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
                    <Grid item xs={12} xl={6}>
                        {renderTextField(formik, 'firstName',
                            "Ad", 'text',
                            user.firstName, false,
                            editing ? false : true,
                            editing ? "success" : "primary"

                        )}
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        {renderTextField(formik, 'lastName',
                            "Soyad", 'text',
                            user.lastName, false,
                            editing ? false : true,
                            editing ? "success" : "primary"
                        )}
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        {renderTextField(formik, 'phone',
                            "Telefon", 'text',
                            user.phone, false,
                            editing ? false : true,
                            editing ? "success" : "primary"
                        )}
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        {renderTextField(formik, "email",
                            'Mail (Değiştirilemez)', "email",
                            user.email, true,
                            editing ? false : true,
                            editing ? "success" : "primary"
                        )}
                    </Grid>
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