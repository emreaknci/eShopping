import React, { useContext, useEffect, useState } from 'react';
import './CartPage.css';
import { Avatar, Box, Button, Grid, Paper, Step, StepButton, Stepper, Typography, useTheme } from '@mui/material';
import styles from '../../../styles';
import { CartContext } from '../../../contexts/CartContext';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import PaymentComponent from '../../../components/mainLayout/cartPage/PaymentComponent';
import Step1 from '../../../components/mainLayout/cartPage/Step1';
import Step2 from '../../../components/mainLayout/cartPage/Step2';
import { Address } from '../../../models/baskets/address';
import { PaymentDetails } from '../../../models/baskets/paymentDetails';
import PaymentSucceeded from '../../../components/mainLayout/cartPage/PaymentSucceeded';
import Step3 from '../../../components/mainLayout/cartPage/Step3';
import { BasketCheckout } from '../../../dtos/baskets/basketCheckout';
import { toast } from 'react-toastify';
import OrderSignalRService from '../../../services/order.signalr.service';

const CartPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const steps = ['Sepetim', 'Teslimat', 'Ödeme'];
  const cartContext = useContext(CartContext);
  const theme = useTheme();
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>();
  const [paymentSucceeded, setPaymentSucceeded] = useState<boolean>(false);
  const [canContinue, setCanContinue] = useState<boolean>(false);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const navigate = useNavigate();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  useEffect(() => {
    if (paymentSucceeded) {
      setActiveStep(3);
    }
  }, [paymentSucceeded])



  useEffect(() => {
    const handleOrderPaymentFailed = (buyerId: string) => {
      toast.error("Ödeme başarısız. Lütfen tekrar deneyin.");
      toast.dismiss();
      setPaymentSucceeded(false);
    };

    const handleOrderPaymentSucceeded = () => {
      setPaymentSucceeded(true);
      setActiveStep(3);
      cartContext.clearCart();
      toast.dismiss();
      // toast.success("Ödeme başarılı. Siparişiniz alındı.");
    };

    if (!cartContext.customerCart) return;

    const orderSignalRService = new OrderSignalRService(handleOrderPaymentFailed, handleOrderPaymentSucceeded);

    // orderSignalRService.connection.on('OrderPaymentFailedMessage', handleOrderPaymentFailed);

    // orderSignalRService.connection.on('OrderPaymentSucceededMessage', handleOrderPaymentSucceeded);
    // return () => {
    //   orderSignalRService.connection.off('OrderPaymentFailedMessage', handleOrderPaymentFailed);
    //   orderSignalRService.connection.off('OrderPaymentSucceededMessage', handleOrderPaymentSucceeded);
    // };

  }, [cartContext])


  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 3) {
      return;
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

  const handlePayment = async () => {
    const basketCheckout: BasketCheckout = {
      paymentDetails: paymentDetails!,
      shippingAddress: shippingAddress!,
      buyer: cartContext.customerCart?.buyerId?.toString() || ''
    }
    basketCheckout.paymentDetails.cardSecurityNumber = basketCheckout.paymentDetails.cardSecurityNumber.toString();
    basketCheckout.paymentDetails.numberOfInstallments = parseInt(basketCheckout.paymentDetails.numberOfInstallments.toString());

    await cartContext.checkout(basketCheckout);

  }



  return (
    <Box sx={styles.mainBoxPadding}>
      {paymentSucceeded || cartContext.cartItemCount > 0 ? <Paper
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
              <Grid item xs={12} sm={12} md={paymentSucceeded ? 12 : 8}>
                {activeStep === 0 && <Step1 setCanContinue={setCanContinue} />}
                {activeStep === 1 && <Step2 shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} setCanContinue={setCanContinue} />}
                {activeStep === 2 && <Step3 setPaymentDetails={setPaymentDetails} setPaymentSucceeded={setPaymentSucceeded} setCanContinue={setCanContinue} />}
                {activeStep === 3 && <PaymentSucceeded shippingAddress={shippingAddress} paymentDetails={paymentDetails} />
                }
              </Grid>
              {!paymentSucceeded && <Grid item xs={12} sm={12} md={4}>
                <PaymentComponent />
                {activeStep == 2 && canContinue && <Button variant='contained' onClick={handlePayment} sx={{ mt: 2, width: '100%' }}>
                  Ödemeyi Tamamla
                </Button>}
              </Grid>}
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

              <Button color="inherit" sx={{ mr: 1 }} disabled={activeStep === 0 || activeStep === 3} onClick={handleBack}>GERİ</Button>

              <Box sx={{ flex: '1 1 auto' }} />
              {!paymentSucceeded && activeStep < steps.length - 1 &&
                <Button disabled={!(activeStep < steps.length - 1 && canContinue)} onClick={handleNext}>İLERİ</Button>
              }
              {paymentSucceeded && <Button onClick={() => navigate("/")}>
                Ana Sayfaya Dön
              </Button>}
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