import { AccordionDetails, Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderDetailDto, { OrderItemDto } from '../../../dtos/orders/orderDetailDto'
import OrderService from '../../../services/order.service'
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';

const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';

const OrderDetails = ({ orderId }: { orderId: string }) => {
    const [detail, setDetail] = useState<OrderDetailDto>()
    const navigate=useNavigate();

    useEffect(() => {
        OrderService.getOrderDetailsById(orderId).then((response) => {
            setDetail(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [orderId])


    const renderPaymentDetails = () => {
        return (
            <>
                <Typography variant="h5" fontWeight="bold">Ödeme Bilgileri</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Toplam Tutar: {detail?.total.toFixed(2)} TL
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Taksit Sayısı: {detail?.numberOfInstallments === 1 ? "Tek Çekim" : detail?.numberOfInstallments + " Taksit"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {detail && <Typography variant="h6">
                            Aylık Ödeme Miktarı:{(detail.total / detail.numberOfInstallments).toFixed(2)} TL
                        </Typography>}
                    </Grid>

                </Grid>
            </>
        )
    }

    const renderAddressDetails = () => {
        return (
            <>
                <Typography variant="h5" fontWeight="bold">Adres Bilgileri</Typography>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Teslimat Adresi:</Typography>
                        <Typography>
                            {detail?.street} {detail?.city.toLocaleUpperCase()} / {detail?.country.toLocaleUpperCase()} {detail?.zipCode}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Typography variant="h6">Fatura Adresi:</Typography>
                        <Typography>
                            {detail?.street} {detail?.city.toLocaleUpperCase()} / {detail?.country.toLocaleUpperCase()} {detail?.zipCode}
                        </Typography>
                    </Grid>
                </Grid>
            </>
        )
    }

    const renderOrderItem = (item: OrderItemDto) => {
        return (
            <>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <img src={baseImagePath + item.pictureUrl} alt={item.productname} width="100%" />
                            <Typography>
                                <IconButton onClick={() => navigate(`/details/${item.productId}`)}>
                                    <LaunchIcon fontSize="medium" />
                                </IconButton>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Typography variant='h5' fontWeight={"bold"}>{item.productname}</Typography>
                            <Typography><strong>Ürün Birim Fiyatı: </strong>{item.unitPrice.toFixed(2)} TL</Typography>
                            <Typography><strong>Sipariş Adedi: </strong>{item.units} </Typography>
                            <Typography><strong>Toplam Fiyat: </strong>
                                {(item.unitPrice * item.units).toFixed(2)} TL
                            </Typography>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }


    return (
        <AccordionDetails>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight="bold">Ürünler</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {detail?.orderItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item sm={12} md={6}>
                                    {renderOrderItem(item)}
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    {renderAddressDetails()}
                </Grid>
                <Grid item sm={12} md={6}>
                    {renderPaymentDetails()}
                </Grid>
                {/* <Grid item sm={12}>
                    <Typography variant="body2" >
                        Tarafımıza yapılan ödemelerin kontrolleri yapıldıktan sonra siparişleriniz hazırlanma aşamasına geçecektir.
                        Hazırlanan siparişleriniz kargoya verildiğinde tarafınıza mail yoluyla bilgilendirme yapılacaktır.
                    </Typography>

                </Grid> */}
            </Grid>
        </AccordionDetails>
    )
}

export default OrderDetails