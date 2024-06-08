import { useState } from 'react';
import { Button, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { renderTextField } from '../../../utils/FormUtils';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { DialogComponent } from '../../../components/common/DialogComponent';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { toast } from 'react-toastify';


type AddressType = {
    name: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
    fullName: string;
}
type SubmitType = 'reset' | 'add' | 'cancel' | 'edit';
const Address = ({ sxValues }: { sxValues: any }) => {
    const [submitType, setSubmitType] = useState<SubmitType>();
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>();
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [addresses, setAddresses] = useState([
        {
            name: 'Ev',
            address: '1234 Main St',
            city: 'Istanbul',
            country: 'Turkey',
            postalCode: '12345',
            phone: '123-456-7890',
            fullName: 'John Doe',
        },
        {
            name: 'İş',
            address: '5678 Elm St',
            city: 'Istanbul',
            country: 'Turkey',
            postalCode: '12345',
            phone: '123-456-7890',
            fullName: 'John Doe',
        },
    ]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');


    const validationSchema = Yup.object({
        name: Yup.string().required('Adres adı zorunludur'),
        address: Yup.string().required('Adres zorunludur'),
        city: Yup.string().required('Şehir zorunludur'),
        country: Yup.string().required('Ülke zorunludur'),
        postalCode: Yup.string().required('Posta kodu zorunludur'),
        phone: Yup.string().required('Telefon zorunludur'),
        fullName: Yup.string().required('Ad Soyad zorunludur'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            city: '',
            country: '',
            postalCode: '',
            phone: '',
            fullName: '',
        },
        validationSchema,
        onSubmit: (values) => {
            setSubmitted(true);
            if (submitType === 'add') {
                setAddresses([...addresses, values]);
                toast.success('Adres bilgileri eklendi!');
            } else if (submitType === 'edit') {
                if (selectedAddressIndex !== undefined) {
                    const updatedAddresses = [...addresses];
                    updatedAddresses[selectedAddressIndex] = values;
                    setAddresses(updatedAddresses);
                    toast.success('Adres bilgileri güncellendi!');
                }
            }
            setShowForm(false);
            setEditing(false);
            formik.resetForm();
        },
    });

    const handleAddAddress = () => {
        setShowForm(true);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitType === 'reset') {
            formik.resetForm();
        } else if (submitType === 'add' || submitType === 'edit') {
            formik.handleSubmit();
        } else if (submitType === 'cancel') {
            handleCancel();
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditing(false);
        formik.resetForm();
    }

    const handleRemoveAddress = (index: number) => {
        setOpenAlert(true);
        const addressName = addresses[index].name;
        setAlertText(`'${addressName}' adresini silmek istediğinize emin misiniz`);
        setSelectedAddressIndex(index);
    }

    const handleEditAddress = (index: number) => {
        setShowForm(true);
        setEditing(true);
        setSelectedAddressIndex(index);
        formik.setValues(addresses[index]);
    }

    const handleDialogConfirm = (index: number) => {
        setOpenAlert(false);
        const newAddresses = addresses.filter((address, i) => i !== index);
        setAddresses(newAddresses);
    }

    return (
        <Paper sx={{ ...sxValues }}>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} container justifyContent="center">
                    <HomeWorkIcon style={{ fontSize: "6rem" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" fontWeight={"bold"}>Adreslerim</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card onClick={handleAddAddress}
                        sx={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            flexDirection: "column",
                            height: "100%"
                        }}>
                        <CardContent>
                            {showForm ?
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} xl={6}>
                                                {renderTextField(formik, 'name', "Adres Adı (Ev,iş)", 'text')}
                                            </Grid>
                                            <Grid item xs={12} xl={6}>
                                                {renderTextField(formik, 'fullName', "Ad Soyad", 'text')}
                                            </Grid>
                                            <Grid item xs={12} xl={6}>
                                                {renderTextField(formik, 'address', "Adres", 'text')}
                                            </Grid>
                                            <Grid item xs={12} xl={6}>
                                                {renderTextField(formik, 'city', "Şehir", 'text')}
                                            </Grid>
                                            <Grid item xs={12} xl={6}>
                                                {renderTextField(formik, 'country', "Ülke", 'text')}
                                            </Grid>
                                            <Grid item xs={12} xl={6}>
                                                {renderTextField(formik, 'postalCode', "Posta Kodu", 'text')}
                                            </Grid>
                                            <Grid item xs={12} xl={6}>
                                                {renderTextField(formik, 'phone', "Telefon", 'text')}
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Grid container spacing={3}>

                                                    <Grid item xs={12} sm={6}>
                                                        <Button variant="contained" fullWidth
                                                            color="primary"
                                                            type="submit"
                                                            sx={{ color: 'white', fontWeight: 'bold' }}
                                                            onClick={() => { setSubmitType('cancel'); }}
                                                        >
                                                            İptal
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Button variant="contained" fullWidth
                                                            color="warning"
                                                            type="submit"
                                                            sx={{ color: 'white', fontWeight: 'bold' }}
                                                            onClick={() => { setSubmitType('reset'); }}
                                                        >
                                                            Sıfırla
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            fullWidth
                                                            color="success"
                                                            sx={{ color: 'white', fontWeight: 'bold' }}
                                                            onClick={() => {
                                                                editing ? setSubmitType('edit') : setSubmitType('add');
                                                            }}
                                                        >
                                                            {editing ? 'Güncelle' : 'Ekle'}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </>
                                :
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <AddHomeWorkIcon fontSize="large" />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" component="h2">Yeni Adres Ekle</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            }
                        </CardContent>
                    </Card>
                </Grid>
                {addresses.map((address, index) => (
                    <Grid item xs={12} xl={6} key={index}>
                        <Card >
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {address.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    Adres: {address.address}
                                </Typography>
                                <Typography color="textSecondary">
                                    Telefon: {address.phone}
                                </Typography>
                                <Typography color="textSecondary">
                                    Şehir: {address.city}, {address.country}
                                </Typography>
                                <Typography color="textSecondary">
                                    Posta Kodu: {address.postalCode}
                                </Typography>
                                <Typography color="textSecondary">
                                    <Grid container spacing={3} mt={1}>
                                        <Grid item xs={12} sm={6}>
                                            <Button variant="contained" fullWidth
                                                color="warning"
                                                sx={{ color: 'white', fontWeight: 'bold' }}
                                                onClick={() => handleEditAddress(index)}
                                            >
                                                Düzenle
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button variant="contained" fullWidth
                                                color="primary"
                                                sx={{ color: 'white', fontWeight: 'bold' }}
                                                onClick={() => handleRemoveAddress(index)}
                                            >
                                                Sil
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {openAlert && (
                <DialogComponent
                    open={openAlert}
                    handleClose={() => setOpenAlert(false)}
                    handleConfirm={() => handleDialogConfirm(selectedAddressIndex as number)}
                    text={alertText}
                />
            )}
        </Paper>

    );
}

export default Address;