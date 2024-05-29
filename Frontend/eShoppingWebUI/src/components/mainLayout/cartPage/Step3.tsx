import { Box, Typography, Grid, Button, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControlLabel, Radio, TextField, Menu, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext';
import { renderTextField } from '../../../utils/FormUtils';
import * as Yup from 'yup';
import { CardType, PaymentDetails } from '../../../models/baskets/paymentDetails';
import { CustomTextFieldComponent } from '../../common/CustomTextFieldComponent';

const validationSchema = Yup.object({
  cardNumber: Yup.string().required('Kart numarası zorunludur'),
  cardHolderName: Yup.string().required('Kart üzerindeki isim zorunludur'),
  cardExpiration: Yup.date().required('Son kullanma tarihi zorunludur'),
  cardSecurityNumber: Yup.string().required('CVC zorunludur'),
  cardTypeId: Yup.number().required('Kart tipi zorunludur'),
});

const initialValues: PaymentDetails = {
  cardNumber: 'Emre',
  cardHolderName: '1234123412341234',
  cardExpiration: new Date('2023-12'),
  cardSecurityNumber: '123',
  cardTypeId: 1,
  numberOfInstallments: 1,
}




const Step3 = ({ setPaymentDetails, setPaymentSucceeded, setCanContinue }
  : {
    setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails | undefined>>,
    setPaymentSucceeded: React.Dispatch<React.SetStateAction<boolean>>,
    setCanContinue: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [installmentPlans, setInstallmentPlans] = useState<{ months: number; monthlyInstallment: number; totalAmount: number; }[]>([]);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const totalprice = cartContext.customerCart?.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    totalprice && calculateInstallmentPlans(totalprice);
  }, [cartContext.customerCart]);

  useEffect(() => {
    setPaymentDetails(initialValues)
  }, [])


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setSubmitted(true);
      const paymentDetails: PaymentDetails = {
        cardNumber: values.cardNumber,
        cardHolderName: values.cardHolderName,
        cardExpiration: new Date(values.cardExpiration),
        cardSecurityNumber: values.cardSecurityNumber,
        cardTypeId: values.cardTypeId,
        numberOfInstallments: values.numberOfInstallments
      };
      setPaymentDetails(paymentDetails);
      console.log('values:', values);
    },
  });

  const handlePlanChange = (event: any) => {
    setSelectedInstallmentPlan(event.target.value);
    console.log('event.target.value:', event.target.value);
  };

  const calculateInstallmentPlans = (price: number) => {
    const plans = [];

    plans.push({ months: "1", monthlyInstallment: price, totalAmount: price });

    for (let i = 2; i <= 6; i++) {
      const totalAmount = price;
      const monthlyInstallment = totalAmount / i;
      plans.push({ months: i, monthlyInstallment, totalAmount: totalAmount });
    }
    setInstallmentPlans(plans as any);
  }

  useEffect(() => {
    setCanContinue(formik.isValid)
    // setPaymentDetails(formik.values)
    formik.handleSubmit()
    console.log(formik.isValid)
  }, [formik.values, setPaymentDetails])

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 16 }}>
        <Typography variant="h5" gutterBottom>
          Ödeme
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Typography variant="h6" gutterBottom>
              Kart Bilgileri
            </Typography>
            <CustomTextFieldComponent formik={formik} fieldName='cardHolderName' label='Kart Üzerindeki İsim' />
            <CustomTextFieldComponent formik={formik} fieldName='cardNumber' label='Kart Numarası' />
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={4} >
                <CustomTextFieldComponent formik={formik} fieldName='cardExpiration' label='Son Kullanma Tarihi' type='month' />
              </Grid>
              <Grid item xs={12} sm={12} md={4} >
                <CustomTextFieldComponent formik={formik} fieldName='cardSecurityNumber' label='CVC' type='number' />
              </Grid>
              <Grid item xs={12} sm={12} md={4} >
                <TextField
                  select
                  fullWidth
                  label="Kart Tipi"
                  variant='standard'
                  value={formik.values.cardTypeId}
                  onChange={(e) => formik.setFieldValue('cardTypeId', e.target.value)}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cardTypeId && Boolean(formik.errors.cardTypeId)}
                  helperText={formik.touched.cardTypeId && formik.errors.cardTypeId}
                  sx={{ marginTop: 2 }}
                >
                  <MenuItem value={1}>Amex</MenuItem>
                  <MenuItem value={2}>Visa</MenuItem>
                  <MenuItem value={3}>Master Card</MenuItem>
                </TextField>
              </Grid>
            </Grid>

          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={6}>

            <Typography variant="h6" gutterBottom>
              Ödeme Planı
            </Typography>
            <RadioGroup value={selectedInstallmentPlan} onChange={handlePlanChange}>
              <TableContainer sx={{ height: "16rem" }}>
                <Table >
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
                            label={`${plan.months} taksit`}
                            onChange={() => {
                              formik.setFieldValue('numberOfInstallments', plan.months);
                            }}
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
          {/* <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
              Ödeme Yap
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </Box>
  );
}

export default Step3