import { Grid, Card, CardContent, FormControlLabel, Radio, Typography, RadioGroup } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CustomTextFieldComponent } from '../../common/CustomTextFieldComponent';
import { Address } from '../../../models/baskets/address';

const validationSchema = Yup.object().shape({
  city: Yup.string().required('Şehir alanı zorunludur').min(2, 'Şehir alanı en az 2 karakter olmalıdır'),
  street: Yup.string().required('Cadde alanı zorunludur').min(2, 'Cadde alanı en az 2 karakter olmalıdır'),
  state: Yup.string().required('Eyalet alanı zorunludur').min(2, 'Eyalet alanı en az 2 karakter olmalıdır'),
  country: Yup.string().required('Ülke alanı zorunludur').min(2, 'Ülke alanı en az 2 karakter olmalıdır'),
  zipCode: Yup.string().required('Posta kodu alanı zorunludur').min(2, 'Posta kodu alanı en az 2 karakter olmalıdır'),
});

const Step2 = ({ shippingAddress,setShippingAddress, setCanContinue }: {
  shippingAddress: Address | undefined,
  setShippingAddress: React.Dispatch<React.SetStateAction<Address | undefined>>,
  setCanContinue: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const cartContext = useContext(CartContext);

  const formik = useFormik({
    initialValues:{
      city: shippingAddress?.city || '',
      street: shippingAddress?.street || '',
      state: shippingAddress?.state || '',
      country: shippingAddress?.country || '',
      zipCode: shippingAddress?.zipCode || '',
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      setShippingAddress(values);
    },
  });
  useEffect(()=>{
    handleChange()
    if(shippingAddress !== undefined){
      formik.setValues(shippingAddress)
      setCanContinue(true)
      return;
    }
    setCanContinue(false)
  },[setShippingAddress])

  const handleChange=()=>{
    formik.handleSubmit()
    console.log(formik.values)
    if(formik.values !== formik.initialValues && formik.isValid){
      setCanContinue(true)
    }
  }

  return (
    <>
      <Typography fontWeight={"bold"} variant="h5" gutterBottom>
        Teslimat Adresi
      </Typography>

      <form onChange={handleChange}>
        <Grid container spacing={3} pt={5}>
          <Grid item xs={12} sm={6} >
            <CustomTextFieldComponent formik={formik} fieldName='city' label='Şehir' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextFieldComponent formik={formik} fieldName='street' label='Cadde' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextFieldComponent formik={formik} fieldName='state' label='Eyalet' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextFieldComponent formik={formik} fieldName='country' label='Ülke' />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextFieldComponent formik={formik} fieldName='zipCode' label='Posta Kodu' />
          </  Grid>
        </Grid>
      </form>
    </>
  );
}

export default Step2