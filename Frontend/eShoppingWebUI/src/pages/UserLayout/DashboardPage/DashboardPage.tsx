import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { Avatar, Grid, Icon, Paper, Typography } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Order, OrderStatus, createFakeOrderData } from '../../../mock/order';
import OrdersBarChart from '../../../components/userLayout/dashboardPage/OrdersBarChart';
import ProductPieChart from '../../../components/userLayout/dashboardPage/ProductPieChart';
import { DataGridTableComponent } from '../../../components/common/DataGridTableComponent';
import { DataGridTableComponentProps } from '../../../components/common/DataGridTableComponent/DataGridTableComponent';
import categories, { createFakeCategories } from '../../../mock/category';

const sxValues = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  p: 2,
};
type GridItem = {
  title: string,
  value: string,
  icon: any
}

interface DailyOrderStatusCount {
  [key: string]: { [key in OrderStatus]?: number };
}

const DashboardPage = () => {
  const [orders, setOrders] = useState(createFakeOrderData(200, 1));
  const [products, setProducts] = useState(createFakeCategories(10, 20).flatMap(category => category.products));

  useEffect(() => {

  }, []);



  const gridItems: GridItem[] = [
    {
      title: 'Toplam Sipariş',
      value: '252',
      icon: <LocalMallIcon fontSize='large' color='primary' />
    },
    {
      title: 'Toplam Ürün',
      value: '428',
      icon: <InventoryIcon fontSize='large' color='primary' />
    },
    {
      title: 'Bugünki Sipariş',
      value: '12',
      icon: <LocalMallIcon fontSize='large' color='primary' />
    },
    {
      title: 'Bugünki Gelir',
      value: '₺12000',
      icon: <PaymentsIcon fontSize='large' color='primary' />
    },
  ]

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

  const renderLineChart = () => {
    return (
      <Paper sx={{ ...sxValues }}>
        <Typography variant="h6">
          Siparişler
        </Typography>
        <OrdersBarChart />
      </Paper>
    )
  }

  const renderPieChart = () => {
    const data = [
      { label: 'Telefonlar', value: 400, color: '#FF0000' },
      { label: 'Tabletler', value: 300, color: '#00FF00' },
      { label: 'Bilgisayarlar', value: 300, color: '#0000FF' },
      { label: 'Kameralar', value: 200, color: '#FFFF00' },
      { label: 'Kulaklıklar', value: 100, color: '#FF00FF' },

    ];
    return (
      <Paper sx={{ ...sxValues }}>
        <Typography variant="h6">
          Ürün Porföyü
        </Typography>
        <ProductPieChart data={data} />
      </Paper>
    )
  }

  const renderLatestOrders = () => {
    const props: DataGridTableComponentProps = {
      columns: [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'total', headerName: 'Total', width: 150 },
      ],
      rows: orders.map((order: Order) => {
        return {
          id: order.id,
          name: order.userFullName,
          status: order.status,
          date: order.orderDate.toLocaleDateString(),
          total: order.totalPrice,
        }
      })
    }
    return (
      <Paper sx={sxValues}>
        <Typography variant="h6">
          Son Siparişler
        </Typography>
        <DataGridTableComponent columns={props.columns} rows={props.rows} />
      </Paper>
    )
  }

  const renderLowStockProducts = () => {
    const lowStockProducts = products.filter(product => product.unitOfStock < 15);

    const props: DataGridTableComponentProps = {
      columns: [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'unitOfStock', headerName: 'Stok Miktarı', width: 150 },
        { field: 'category', headerName: 'Kategori', width: 150 },
        { field: 'price', headerName: 'Fiyat', width: 150 },
      ],
      rows: [
        ...lowStockProducts.map(product => {
          return {
            id: product.id,
            name: product.name,
            unitOfStock: product.unitOfStock,
            price: product.price,
            category: product.category.name
          }
        })
      ]
    }
    return (
      <Paper sx={sxValues}>
        <Typography variant="h6">
          Stoğu Azalan Ürünler
        </Typography>
        <DataGridTableComponent columns={props.columns} rows={props.rows} />
      </Paper>
    )
  }
  return (
    <>
      <Grid container spacing={3} >
        <Grid item xs={12} >
          <Typography variant="h4">
            Dashboard
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={5} xl={4} >
          {renderPieChart()}
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={7} xl={8} >
          <Grid container spacing={3} >
            {gridItems.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={6} lg={6} xl={6} >
                {renderGridItem(item)}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} >
          {renderLineChart()}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {renderLatestOrders()}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {renderLowStockProducts()}
        </Grid>
      </Grid >
    </>
  );
};

export default DashboardPage;
