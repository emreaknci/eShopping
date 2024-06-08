import React, { useEffect, useState } from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Grid, Paper, Typography } from '@mui/material';
import OrderService from '../../../services/order.service';
import RevenueAndOrdersDto from '../../../dtos/orders/revenueAndOrdersDto';

type GridItem = {
    title: string,
    value: string,
    icon: any
}
const sxValues = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    p: 2,
};
const OrdersRevenueAndCount = () => {

    const [gridItems, setGridItems] = useState<GridItem[]>([])

    useEffect(() => {
        OrderService.getRevenueAndOrdersDto().then(response => {
            console.log(response.data)
            const data = response.data as RevenueAndOrdersDto;
            const gridItems: GridItem[] = [
                { title: 'Toplam Sipariş', value: data.totalOrders.toString() + ' adet', icon: <LocalMallIcon fontSize='large' color='primary' /> },
                { title: 'Toplam Gelir', value: data.totalRevenue.toString() + ' TL', icon: <PaymentsIcon fontSize='large' color='primary' /> },
                { title: 'Bugünki Sipariş', value: data.todayOrders.toString() + ' adet', icon: <LocalMallIcon fontSize='large' color='primary' /> },
                { title: 'Bugünki Gelir', value: data.todayRevenue.toString() + ' TL', icon: <PaymentsIcon fontSize='large' color='primary' /> }
            ]

            setGridItems(gridItems)
        }).catch(error => {
            console.log(error)

            const gridItems: GridItem[] = [
                { title: 'Toplam Sipariş', value: '0 adet', icon: <LocalMallIcon fontSize='large' color='primary' /> },
                { title: 'Toplam Gelir', value: '0 TL', icon: <PaymentsIcon fontSize='large' color='primary' /> },
                { title: 'Bugünki Sipariş', value: '0 adet', icon: <LocalMallIcon fontSize='large' color='primary' /> },
                { title: 'Bugünki Gelir', value: '0 TL', icon: <PaymentsIcon fontSize='large' color='primary' /> }
            ]

            setGridItems(gridItems)
        })
    }, [])

    const renderGridItem = (item: GridItem) => {
        return (
            <Paper sx={{ ...sxValues }}>
                <Typography variant="h6">{item.title}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                    {item.icon}
                </div>
            </Paper>
        )
    }
    return (
        <Grid container spacing={3} >
            {gridItems.map((item, index) => (
                <Grid key={index} item xs={12} sm={12} md={6} lg={6} xl={6} >
                    {renderGridItem(item)}
                </Grid>
            ))}
        </Grid>
    )
}

export default OrdersRevenueAndCount