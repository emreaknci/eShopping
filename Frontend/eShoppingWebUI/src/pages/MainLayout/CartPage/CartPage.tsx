import React, { useContext, useEffect, useState } from 'react';
import './CartPage.css';
import { Avatar, Box, Button, Card, CardContent, Divider, FormControlLabel, Grid, IconButton, Paper, Step, StepButton, Stepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import styles from '../../../styles';
import { CartContext } from '../../../contexts/CartContext';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { DialogComponent } from '../../../components/common/DialogComponent';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { renderTextField } from '../../../utils/FormUtils';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Step1 = () => {
  const cartContext = useContext(CartContext);
  const [isloading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmText, setConfirmText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setCartItems(cartContext.cartItems);
    setIsLoading(false);
  }, [cartContext.cartItems]);

  const handleIncreaseQuantity = (item: any) => {
    cartContext.increaseQuantity(item);
  }

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity === 1) {
      setCurrentItem(item);
      setConfirmAction('remove');
      setConfirmText('Ürünü sepetten kaldırmak istediğinize emin misiniz?');
      setOpenAlert(true);
    } else {
      cartContext.decreaseQuantity(item);
    }
  };

  const handleRemoveItem = (item: any) => {
    setConfirmAction('removeItem');
    setConfirmText('Tüm ürünleri sepetten kaldırmak istediğinize emin misiniz?');
    setOpenAlert(true);
    setCurrentItem(item)
  };

  const handleClearCart = () => {
    setConfirmAction('clearCart');
    setConfirmText('Sepeti boşaltmak istediğinize emin misiniz?');
    setOpenAlert(true);
  };

  const handleConfirm = (item: any) => {
    setOpenAlert(false);

    if (confirmAction === 'remove') {
      cartContext.decreaseQuantity(item);
    } else if (confirmAction === 'removeItem') {
      cartContext.removeFromCart(item);
    } else if (confirmAction === 'clearCart') {
      cartContext.clearCart();
    }
  };

  return (
    <Box>
      <Typography fontWeight={"bold"} variant="h5" gutterBottom>
        Sepetim
      </Typography>

      {!isloading && <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Ürün Adı</TableCell>
              <TableCell align="center">Ürün Adeti</TableCell>
              <TableCell align="center">Toplam Fiyat</TableCell>
              <TableCell align="center">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span>Hepsini Kaldır</span>
                  <IconButton disabled={cartContext.cartItemCount <= 0} onClick={() => handleClearCart()}>
                    <DeleteForeverOutlinedIcon color='primary' />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {cartItems && cartItems.map((item, index) => (
              <>
                <TableRow key={index}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton onClick={() => handleDecreaseQuantity(item)}>
                        {item.quantity === 1
                          ? <DeleteForeverOutlinedIcon color='primary' />
                          : <RemoveCircleOutlineOutlinedIcon color='primary' />}
                      </IconButton>
                      <span>{item.quantity}</span>
                      <IconButton onClick={() => handleIncreaseQuantity(item)}>
                        <AddCircleOutlineOutlinedIcon color='success' />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell align="center">₺{(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span>Ürünü Kaldır</span>
                      <IconButton onClick={() => handleRemoveItem(item)}>
                        <DeleteForeverOutlinedIcon color='primary' />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>

              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
      {openAlert && (
        <DialogComponent
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={() => handleConfirm(currentItem)}
          text={confirmText}
        />
      )}
    </Box>
  );
}

const Step2 = () => {
  const cartContext = useContext(CartContext);
  const [selectedAddress, setSelectedAddress] = useState("Ev Adresi");
  const [selectedCargoCompany, setSelectedCargoCompany] = useState("Yurtiçi Kargo");

  const cargoCompanies = ["Yurtiçi Kargo", "MNG Kargo", "KolayGelsin"];
  const renderCargoCompanies = () => {
    return (
      <>
        {cargoCompanies.map((company, index) => (
          <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                paddingTop: 1,
                cursor: "pointer",
                width: "100%"
              }}
            >
              <CardContent>
                <FormControlLabel value={company} label={`${company} - ${cartContext.totalPrice > 1500 ? "Ücretsiz" : "₺40"}`}
                  key={company} onChange={handleCargoCompanyChange}
                  control={<Radio checked={selectedCargoCompany === company} />}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </>
    )
  }

  const addresses = [
    {
      id: 1,
      title: "Ev Adresi",
      name: "Ali Veli",
      address: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus nemo aperiam enim odit! Dolorum, tempora?",
      postalCode: "12345",
      phone: "1234567890",
      email: ""
    },
    {
      id: 2,
      title: "İş Adresi",
      name: "Ali Veli",
      address: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus nemo aperiam enim odit! Dolorum, tempora?",
      postalCode: "12345",
      phone: "1234567890",
      email: ""
    },
    {
      id: 3,
      title: "Diğer Adres",
      name: "Ali Veli",
      address: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus nemo aperiam enim odit! Dolorum, tempora?",
      postalCode: "12345",
      phone: "1234567890",
      email: ""
    }
  ]


  const renderAddresses = () => {
    return (
      <>
        {addresses.map((address, index) => (
          <Grid item xs={12} sm={12} md={6}>

            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2, cursor: "pointer" }}>
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  <FormControlLabel key={address.id}
                    value={address.title} label={address.title}
                    control={<Radio checked={selectedAddress === address.title} />}
                    onChange={handleAddressChange}
                  />
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {address.name}
                </Typography>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  Adres: {address.address}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Posta Kodu: {address.postalCode}
                </Typography>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  Telefon: {address.phone}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Email: {address.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </>
    )
  }

  const handleAddressChange = (e) => {
    console.log(e.target.value);
    setSelectedAddress(e.target.value);
  };

  const handleCargoCompanyChange = (e) => {
    console.log(e.target.value);
    setSelectedCargoCompany(e.target.value);
  };

  return (
    <>
      <Typography fontWeight={"bold"} variant="h5" gutterBottom>
        Teslimat Adresi
      </Typography>

      <RadioGroup
        name="radio-buttons-cargo"
        aria-labelledby="radio-buttons-groupcargo"
      >
        <Grid container spacing={3} pt={5}>
          <Grid item xs={12} sm={12} md={6}>
            <Card sx={{
              height: "100%", boxShadow: 3,
              borderRadius: 2, padding: 2,
              cursor: "pointer",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>

              <AddIcon fontSize='large' color="primary" />
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Yeni Adres Ekle
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {renderAddresses()}          </Grid>
      </RadioGroup>

      <Typography fontWeight={"bold"} variant="h5" paddingTop={5}>
        Kargo Firması
      </Typography>
      <RadioGroup
        name="radio-buttons-cargo"
        aria-labelledby="radio-buttons-groupcargo"
      >
        <Grid container spacing={3} pt={5}>
          {renderCargoCompanies()}
        </Grid>
      </RadioGroup>

    </>
  );
}

const Step3 = () => {
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [installmentPlans, setInstallmentPlans] = useState<{ months: number; monthlyInstallment: number; totalAmount: number; }[]>([]);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    calculateInstallmentPlans(cartContext.totalPrice);
  }, []);

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required('Kart numarası zorunludur'),
    cardName: Yup.string().required('Kart üzerindeki isim zorunludur'),
    expirationDate: Yup.string().required('Son kullanma tarihi zorunludur'),
    cvc: Yup.string().required('CVC zorunludur'),
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardName: '',
      expirationDate: ``,
      cvc: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitted(true);
      // kart
      console.log('values:', values);
    },
  });

  const handlePlanChange = (event) => {
    setSelectedInstallmentPlan(event.target.value);
    console.log('event.target.value:', event.target.value);
  };

  const calculateInstallmentPlans = (price: number) => {
    const interestRate = 3.66;
    let plans = [];

    plans.push({ months: "1", monthlyInstallment: price, totalAmount: price });

    for (let i = 2; i <= 6; i++) {
      const annualInterestRate = interestRate * i;
      const interestAmount = (price * annualInterestRate) / 100;
      const totalAmount = price + interestAmount;
      const monthlyInstallment = totalAmount / i;
      plans.push({ months: i, monthlyInstallment, totalAmount: totalAmount });
    }
    setInstallmentPlans(plans);
  }


  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ödeme
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Kart Bilgileri
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 16 }}>
            {renderTextField(formik, 'cardNumber', 'Kart Numarası', 'email')}
            {renderTextField(formik, 'cardName', 'Kart Üzerindeki İsim')}
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6} >
                {renderTextField(formik, 'expirationDate', 'Son Kullanma Tarihi', 'month')}
              </Grid>
              <Grid item xs={12} sm={12} md={6} >
                {renderTextField(formik, 'cvc', 'CVC Kodu', 'number')}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
              Ödeme Yap
            </Button>
          </form>
        </Grid>


        <Grid item xs={12} sm={12} md={6}>

          <Typography variant="h6" gutterBottom>
            Ödeme Planı
          </Typography>
          <RadioGroup value={selectedInstallmentPlan} onChange={handlePlanChange}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Taksit Sayısı</TableCell>
                    <TableCell>Aylık Ödeme</TableCell>
                    <TableCell>Toplam Tutar</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {installmentPlans.map((plan, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormControlLabel
                          value={plan.months}
                          control={<Radio />}
                          label={`${plan.months} taksit`
                          }
                        />
                      </TableCell>
                      <TableCell>{(plan.monthlyInstallment).toFixed(2)} TL/ay</TableCell>
                      <TableCell>{plan.totalAmount.toFixed(2)} TL</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </RadioGroup>
        </Grid>
      </Grid>
    </Box>
  );
}

const PaymentComponent = ({ totalPrice }: { totalPrice?: number }) => {
  const cartContext = useContext(CartContext);



  const calculateTotalKDV = () => {
    return (cartContext.totalPrice * 0.18).toFixed(2);
  }

  const calculateTotalShipping = () => {
    if (cartContext.totalPrice > 1500)
      return 0;
    else
      return 40;
  }

  return (
    <>
      <Typography fontWeight={"bold"} variant="h5" gutterBottom>
        Sipariş Özeti
      </Typography>

      <Grid container spacing={3} sx={{ p: 1, pt: 5 }}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" align="left">Ara Toplam:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" align="right">
            ₺{(cartContext.totalPrice - Number(calculateTotalKDV())).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" align="left">KDV:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" align="right">₺{calculateTotalKDV()}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" align="left">Kargo:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" align="right">₺{calculateTotalShipping()}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" align="left">TOPLAM:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" align="right">₺{(cartContext.totalPrice + Number(calculateTotalShipping())).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

const CartPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const steps = ['Sepetim', 'Teslimat', 'Ödeme'];
  const cartContext = useContext(CartContext);
  const theme = useTheme();
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const navigate = useNavigate();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };



  return (
    <Box sx={styles.mainBoxPadding}>
      {cartContext.cartItemCount > 0 ? <Paper
        elevation={3}
        sx={{ padding: "1rem", }}
      >
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <>
            <Grid container spacing={3} sx={{ p: 1, pt: 5 }}>
              <Grid item xs={12} sm={12} md={9}>
                {activeStep === 0 && <Step1 />}
                {activeStep === 1 && <Step2 />}
                {activeStep === 2 && <Step3 />}
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <PaymentComponent />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                GERİ
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'BİTİR' : 'İLERİ'}
              </Button>
            </Box>
          </>
        </Box>
      </Paper> :
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "75vh",
            textAlign: "center",
            flexDirection: "column"
          }}
        >
          <Typography fontWeight="bold" variant="h5" gutterBottom>
            <Avatar sx={{ width: "5rem", height: "5rem", bgcolor: theme.palette.primary.main, color: "white" }}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: "3.5rem" }} />
            </Avatar>
          </Typography>


          <Typography fontWeight={"bold"} variant="h4" gutterBottom>
            Sepetim
          </Typography>
          <Typography variant="h5" gutterBottom>
            Sepetinizde ürün bulunmuyor.
          </Typography>
          <Typography fontWeight={"bold"} variant="h5" gutterBottom>
            <Button
              sx={{
                mt: 2,
                p: 1.5,
                fontSize: "1rem",
                cursor: "pointer",
                backgroundColor: `${theme.palette.primary.main}`,
                borderRadius: "2rem",
                fontWeight: "bold",
                color: "white",
                "&:hover": {
                  backgroundColor: `${theme.palette.primary.dark}`,
                },
              }}
              onClick={() => navigate("/")}
            >
              Alışverişe Başla
            </Button>
          </Typography>
        </Box>

      }
    </Box>
  );
};

export default CartPage;
