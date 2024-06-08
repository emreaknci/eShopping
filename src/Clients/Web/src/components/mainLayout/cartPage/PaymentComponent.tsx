import { Typography, Grid } from '@mui/material';
import React, { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext';

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
            <Typography variant="h5" align="left">TOPLAM: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" align="right"> ₺{(cartContext.totalPrice + Number(calculateTotalShipping())).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  }

export default PaymentComponent