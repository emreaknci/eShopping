import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGridTableComponent } from '../../common/DataGridTableComponent'
import { DataGridTableComponentProps } from '../../common/DataGridTableComponent/DataGridTableComponent'
import OrderService from '../../../services/order.service'
import LatestOrdersDto, { OrderDto } from '../../../dtos/orders/latestOrdersDto'
import { OrderStatus, OrderStatusStrings } from '../../../enums/orderStatus'

const sxValues = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  p: 2,
};

const LatestOrders = () => {
  const [orders, setOrders] = useState<OrderDto[]>([])

  useEffect(() => {
    OrderService.getLatestOrdersDto(100).then(response => {
      const data = response.data as LatestOrdersDto;
      setOrders(data.orders)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  const props: DataGridTableComponentProps = {
    columns: [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Müşteri (Tam) Adı', width: 150 },
      { field: 'status', headerName: 'Durumu', width: 150 },
      { field: 'date', headerName: 'Tarih', width: 150 },
      { field: 'total', headerName: 'Toplam', width: 150 },
    ],
    rows: orders.map((order: OrderDto) => {
      return {
        id: "# " + order.orderId,
        name: order.buyerName,
        status: OrderStatusStrings[order.orderStatus as keyof typeof OrderStatusStrings],
        date: new Date(order.orderDate).toLocaleDateString(),
        total: order.total + " TL",
      }
    })
  }
  return (
    <Paper sx={sxValues}>
      <Typography variant="h6">
        Son Siparişler
      </Typography>
      {orders.length > 0
        ? <DataGridTableComponent columns={props.columns} rows={props.rows} />
        :<Typography variant="body1">Son sipariş bulunmamaktadır.</Typography>
}    </Paper>
  )
}

export default LatestOrders