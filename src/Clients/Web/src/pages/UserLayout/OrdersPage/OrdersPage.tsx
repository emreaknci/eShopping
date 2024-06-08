import React, { useEffect, useState } from 'react';
import {
  Box, Button, CardMedia,
  Collapse, FormControl, Grid,
  IconButton, InputAdornment, MenuItem,
  Paper, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination,
  TableRow, TextField, Typography
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Search } from '@mui/icons-material';
import styles from './OrdersPage.style';
import { DialogComponent } from '../../../components/common/DialogComponent';
import OrderService from '../../../services/order.service';
import OrderListDto, { OrderDto } from '../../../dtos/orders/orderListDto';
import { OrderStatus, OrderStatusStrings } from '../../../enums/orderStatus';
import OrderDetails from '../../../components/userLayout/ordersPage/OrderDetails';
import FilterBox from '../../../components/userLayout/ordersPage/FilterBox';
import { DateOption, getIndexForDateOption } from '../../../enums/dateOptions';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null);
  const [orders, setOrders] = useState<OrderListDto>();

  useEffect(() => {
    const getOrderPromise = OrderService.getOrders(page + 1, rowsPerPage, getIndexForDateOption(DateOption.AllTime), Number(filterStatus), searchQuery);

    getOrderPromise
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
      });
  }, [filterStatus, page, rowsPerPage, searchQuery]);


  const handleConfirm = (itemId: any) => {
    setOpenAlert(false);
    cancelOrder(itemId);
  };



  const handleCancelOrder = (orderId: any) => {
    setOpenAlert(true);
    setAlertText('Sipariş iptal edilecek. Onaylıyor musunuz?');
    setCurrentItemId(orderId)
  }


  const handleSort = (field: any) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleExpand = (orderId: any) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const cancelOrder = async (orderId: any) => {
    console.log(`Order with id ${orderId} is cancelled.`);
    toast.success('Sipariş iptal edildi');

    await OrderService.updateOrderStatus(orderId, OrderStatus.CancelledByStore).then(() => {
      const orderIndex = orders?.orders.findIndex(order => order.orderId === orderId);

      if (orderIndex !== -1 && orders) {
        const updatedOrders = [...orders.orders];
        updatedOrders[orderIndex!].orderStatus = OrderStatus.CancelledByStore;
        setOrders({ ...orders, orders: updatedOrders });

      }
    }
    ).catch((error) => {
      console.log(error);
    });

  };

  const sortedOrders = sortField ? orders?.orders.sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (sortDirection === 'asc') {
      return fieldA < fieldB ? -1 : 1;
    } else {
      return fieldA > fieldB ? -1 : 1;
    }
  }) : orders?.orders;


  const renderTableHeadCell = (name: string, fieldName?: string, align: 'left' | 'center' | 'right' = 'left') => {
    return (
      <>
        <TableCell align={align}>
          {fieldName ? (
            <Button onClick={() => handleSort(fieldName)} color="inherit">
              {name}
              {sortDirection === 'asc' ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </Button>
          ) : (
            <Typography color="main">
              {name}
            </Typography>
          )}
        </TableCell>
      </>
    );
  };

  const renderTableBodyParentRow = (order: OrderDto) => {
    return (
      <TableRow sx={{ pb: 5, pt: 5 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(order.orderId)}
          >
            {expandedOrderId === order.orderId ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {order.orderId}
        </TableCell>
        <TableCell align='center'> {order.orderDate.toLocaleDateString()} </TableCell>
        <TableCell >
          <Typography align='center' sx={{ ...styles.orderStatusStyles(order.orderStatus) }}>
            {OrderStatusStrings[order.orderStatus as keyof typeof OrderStatusStrings]}
          </Typography>
        </TableCell>
        <TableCell align='right'>
          {order.orderStatus === OrderStatus.PaymentPending || order.orderStatus === OrderStatus.Preparing && (
            <Button onClick={() => handleCancelOrder(order.orderId)}>İptal Et</Button>
          )}
        </TableCell>
      </TableRow>
    )
  }

  const handleSearchQuery = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant="h4">
          Siparişler
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <TableContainer component={Paper}>
          <FilterBox filterStatus={filterStatus} setFilterStatus={setFilterStatus}
            searchQuery={searchQuery} handleSearchQuery={handleSearchQuery}
          />
          <Table>
            <TableHead>
              <TableRow>
                {renderTableHeadCell('ID', 'id')}
                {renderTableHeadCell('SİPARİŞ TARİHİ', 'orderDate', 'center')}
                {renderTableHeadCell('DURUM', 'status', 'center')}
                {renderTableHeadCell('', '', 'right')}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.orders?.map(order => (
                <React.Fragment key={order.orderId}>
                  {renderTableBodyParentRow({ ...order, orderDate: new Date(order.orderDate) })}
                  {order.orderId == expandedOrderId && <OrderDetails expandedOrderId={expandedOrderId} setExpandedOrderId={setExpandedOrderId} />}
                </React.Fragment>
              ))}
              {orders?.orders?.length === 0 &&
                <TableRow>
                  <TableCell colSpan={12}>
                    <Typography variant="h6" align="center">
                      Sipariş bulunamadı
                    </Typography>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
          {sortedOrders && <TablePagination
            rowsPerPageOptions={[1, 5, 10, 25]}
            component="div"
            count={orders!.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />}
        </TableContainer>
      </Grid>
      {openAlert && (
        <DialogComponent
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={() => handleConfirm(currentItemId)}
          text={alertText}
        />
      )}
    </Grid>
  );
};

export default OrdersPage;