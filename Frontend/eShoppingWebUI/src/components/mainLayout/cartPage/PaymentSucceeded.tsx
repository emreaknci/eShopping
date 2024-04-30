import React, { useContext } from 'react'
import { Address } from '../../../models/baskets/address'
import { CardType, PaymentDetails } from '../../../models/baskets/paymentDetails'
import { Box, Typography, Grid, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControlLabel, Radio } from '@mui/material'
import { CartContext } from '../../../contexts/CartContext'

const PaymentSucceeded = ({ shippingAddress, paymentDetails }: { shippingAddress: Address | undefined, paymentDetails: PaymentDetails | undefined }) => {
    const cartContext = useContext(CartContext)

    return (
        <Box>
            <Typography fontWeight={"bold"} variant="h5" gutterBottom>
                Ödeme Başarılı!
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Teslimat Adresi
                    </Typography>
                    {shippingAddress && <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Şehir</strong></TableCell>
                                    <TableCell>{shippingAddress.city}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Cadde</strong></TableCell>
                                    <TableCell>{shippingAddress.street}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Eyalet</strong></TableCell>
                                    <TableCell>{shippingAddress.state}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Ülke</strong></TableCell>
                                    <TableCell>{shippingAddress.country}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Posta Kodu</strong></TableCell>
                                    <TableCell>{shippingAddress.zipCode}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }

                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Ödeme Detayları
                    </Typography>
                    {paymentDetails && <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Ödeme Tipi</strong></TableCell>
                                    <TableCell>{CardType[paymentDetails.cardTypeId]}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Taksit Sayısı</strong></TableCell>
                                    <TableCell>{paymentDetails.numberOfInstallments}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default PaymentSucceeded