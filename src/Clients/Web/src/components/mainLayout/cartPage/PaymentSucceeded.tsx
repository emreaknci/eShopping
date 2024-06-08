import React, { useContext, useState } from 'react'
import { Address } from '../../../models/baskets/address'
import { CardType, PaymentDetails } from '../../../models/baskets/paymentDetails'
import { Box, Typography, Grid, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControlLabel, Radio, IconButton, useTheme } from '@mui/material'
import { CartContext } from '../../../contexts/CartContext'
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom'

const PaymentSucceeded = ({ shippingAddress, paymentDetails }: { shippingAddress: Address | undefined, paymentDetails: PaymentDetails | undefined }) => {
    const cartContext = useContext(CartContext)
    const [cartItems, setCartItems] = useState(cartContext.customerCart?.items || []);
    const [totalPrice, setTotalPrice] = useState(cartItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0));
    const navigate = useNavigate()
    const theme = useTheme();
    const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';


    return (
        <Box>
            <Typography fontWeight={"bold"} variant="h4" gutterBottom>
                Ödeme Başarılı!
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>

                    <Typography variant="h5" gutterBottom>
                        Ürünler
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell align="center">Ürün Resmi</TableCell>
                                    <TableCell align="center">Ürün Adı</TableCell>
                                    <TableCell align="center">Ürün Adeti</TableCell>
                                    <TableCell align="center">Toplam Fiyat</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems && cartItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>

                                            <TableCell align="center">
                                                <IconButton onClick={() => navigate(`/details/${item.productId}`)}>
                                                    <LaunchIcon fontSize="medium" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center"><img src={baseImagePath + item.pictureUrl} alt="Ürün Resmi" style={{ width: "2.5rem" }} /></TableCell>
                                            <TableCell align="center">{item.productName}</TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell align="center">₺{(item.unitPrice * item.quantity).toFixed(2)}</TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <br /><br />
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" gutterBottom>
                        Teslimat Adresi
                    </Typography>

                    {shippingAddress &&
                        <Typography variant="h5">
                            {shippingAddress?.street}, {shippingAddress.state} - {shippingAddress.city}/{shippingAddress.country} - {shippingAddress.zipCode}
                        </Typography>
                    }
                </Grid>
                <br /><br />
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" gutterBottom>
                        Ödeme Detayları
                    </Typography>
                    {/* {paymentDetails} */}
                    {paymentDetails &&
                        <Typography variant="h5">
                            Taksit Sayısı: {paymentDetails.numberOfInstallments == 1 ? "Peşin" : paymentDetails.numberOfInstallments}<br />
                            Aylık Tutar: {(totalPrice / paymentDetails.numberOfInstallments).toFixed(2)}<br />
                        </Typography>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default PaymentSucceeded