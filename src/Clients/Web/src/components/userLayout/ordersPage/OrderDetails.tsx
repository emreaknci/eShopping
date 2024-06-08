import { TableRow, TableCell, Collapse, Grid, Typography, Table, TableHead, TableBody, CardMedia, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderService from '../../../services/order.service'
import OrderDetailDto from '../../../dtos/orders/orderDetailDto'
import { LoadingComponent } from '../../common/LoadingComponent'
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
export interface OrderDetailsProps {
    expandedOrderId: any;
    setExpandedOrderId: any;
}
const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';

const OrderDetails = (props: OrderDetailsProps) => {
    const [detail, setDetail] = useState<OrderDetailDto>()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.expandedOrderId) return;
        setLoading(true)
        OrderService.getOrderDetailsById(props.expandedOrderId).then((response) => {
            setDetail(response.data)
            console.log(response.data.orderItems)
            props.setExpandedOrderId(response.data.orderId)

        }).catch((error) => {
            console.log(error)
            props.setExpandedOrderId(null)
            setDetail(undefined)

        }).finally(() => {
            setLoading(false)

        })
    }, [props])

    if (loading)
        return <LoadingComponent />

    if (!detail)
        return null;

    return (
        <>
            <TableRow >
                <TableCell colSpan={4}>
                    <Collapse in={props.expandedOrderId === detail.orderId} timeout="auto" unmountOnExit>
                        <Grid container spacing={3}>
                            <Grid item md={4} >
                                <Grid container>
                                    <Grid item sm={6} md={12}>
                                        <Typography variant="body1">
                                            <strong style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>Sipariş Bilgileri</strong>
                                            <br /> <br />
                                            <strong>Sipariş Sahibi:</strong> {detail.buyerName}
                                            <br /><br />
                                            <strong>Toplam Tutar:</strong> {detail.total} TL
                                            <br />
                                            <strong>Taksit Sayısı:</strong> {detail.numberOfInstallments === 1 ? "Tek Çekim" : detail.numberOfInstallments + " Taksit"}
                                            <br />
                                            <strong>Aylık Ödeme Miktarı:</strong> {(detail.total / detail.numberOfInstallments).toFixed(2)} TL
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={12}>
                                        <Typography variant="body1">
                                            <strong style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>Adres Bilgileri</strong>
                                            <br /> <br />
                                            <strong>Ülke:</strong> {detail.country}
                                            <br />
                                            <strong>Şehir:</strong> {detail.city}
                                            <br />
                                            <strong>Sokak/Mahalle: </strong> {detail.street}
                                            <br />
                                            <strong>Posta Kodu:</strong> {detail.zipCode}
                                        </Typography>
                                    </Grid>
                                </Grid>


                            </Grid>
                            <Grid item md={8}>
                                <Typography variant="h6" fontWeight={"bold"}  >
                                    Sipariş Edilen Ürünler
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">#</TableCell>
                                            <TableCell align="center">Ürün Resmi</TableCell>
                                            <TableCell align="center">Ürün Adı</TableCell>
                                            <TableCell align="center">Fiyat</TableCell>
                                            <TableCell align="center">Miktar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {detail.orderItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => navigate(`/details/${item.productId}`)}>
                                                        <LaunchIcon fontSize="medium" />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center">
                                                    <CardMedia
                                                        component="img"
                                                        alt={item.productname}
                                                        height="50"
                                                        image={baseImagePath + item.pictureUrl}
                                                        title={item.productname}
                                                        style={{
                                                            margin: 'auto',
                                                            maxWidth: '100%',
                                                            objectFit: 'contain',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center"> {item.productname}</TableCell>
                                                <TableCell align="center">{item.unitPrice} TL</TableCell>
                                                <TableCell align="center">{item.units}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>

        </>

    )
}

export default OrderDetails