import React, { useState } from 'react';
import { Order, OrderItem, OrderStatus, createFakeOrderData } from '../../../mock/order';
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

const OrdersPage = () => {
  const [orders, setOrders] = useState(createFakeOrderData(20, 5));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [confirmAction, setConfirmAction] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null);

  const handleConfirm = (itemId: any) => {
    setOpenAlert(false);
    if (confirmAction === 'cancelOrderItem') {
      cancelOrderItem(itemId);
    } else if (confirmAction === 'cancelOrder') {
      cancelOrder(itemId);
    }
  };

  const handleCancelItem = (itemId: any) => {
    setOpenAlert(true);
    setConfirmAction('cancelOrderItem');
    setAlertText('Ürün iptal edilecek. Onaylıyor musunuz?');
    setCurrentItemId(itemId)
  }

  const handleCancelOrder = (orderId: any) => {
    setOpenAlert(true);
    setConfirmAction('cancelOrder');
    setAlertText('Sipariş iptal edilecek. Onaylıyor musunuz?');
    setCurrentItemId(orderId)
  }


  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleExpand = (orderId: any) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const cancelOrder = (orderId: any) => {
    // Siparişi iptal etmek için gerekli işlemleri yapın
    console.log(`Order with id ${orderId} is cancelled.`);
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        // Eğer siparişin id'si verilen orderId ile eşleşiyorsa, siparişin durumunu iptal edin
        return { ...order, status: OrderStatus.Cancelled };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const areAllItemsCancelled = (items: OrderItem[]) => items.every(item => item.isCancelled);

  const cancelOrderItem = (itemId: any) => {
    const updatedOrders = orders.map(order => {
      const updatedItems = order.orderItems.map(item =>
        (item.id === itemId) ? {
          ...item,
          isCancelled: true,
          cancelledDate: new Date()
        } :
          item
      );

      const allItemsCancelled = areAllItemsCancelled(updatedItems);

      return {
        ...order,
        orderItems: updatedItems,
        status: allItemsCancelled ? OrderStatus.Cancelled : order.status
      };

    });
    setOrders(updatedOrders);
  };

  const filteredOrders = orders.filter(order => {
    const includesSearch = Object.values(order).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
    const matchesStatus = filterStatus === 'All' ? true : order.status === filterStatus;
    return includesSearch && matchesStatus;
  });


  const sortedOrders = sortField ? filteredOrders.sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (sortDirection === 'asc') {
      return fieldA < fieldB ? -1 : 1;
    } else {
      return fieldA > fieldB ? -1 : 1;
    }
  }) : filteredOrders;

  const paginatedOrders = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


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

  const renderTableBodyParentRow = (order: Order) => {
    return (
      <TableRow sx={{ pb: 5, pt: 5 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(order.id)}
          >
            {expandedOrderId === order.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {order.id}
        </TableCell>
        <TableCell align='center'>{order.orderDate.toLocaleDateString()}</TableCell>
        <TableCell >
          <Typography align='center' sx={{ ...styles.orderStatusStyles(order.status) }}>
            {order.status}
          </Typography>
        </TableCell>
        <TableCell align='right'>
          {order.status === OrderStatus.Pending && (
            <Button onClick={() => handleCancelOrder(order.id)}>İptal Et</Button>
          )}
          {order.status === OrderStatus.Cancelled && (
            <Button disabled>İPTAL EDİLDİ</Button>
          )}
          {(order.status !== OrderStatus.Pending && order.status !== OrderStatus.Cancelled) && (
            <Button disabled>İPTAL EDİLEMEZ</Button>
          )}
        </TableCell>
      </TableRow>
    )
  }

  const renderTableBodySubRow = (order: Order) => {
    return (
      <TableRow >
        <TableCell colSpan={4}>
          <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
            <Grid container spacing={3}>
              <Grid item md={4} >
                <Typography variant="h6" fontWeight={"bold"}>
                  Sipariş Bilgileri
                </Typography>
                <Grid container>
                  <Grid item xs={12}>
                    <p>
                      <strong>Sipariş Sahibi:</strong> {order.userFullName}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      <strong>Toplam Tutar:</strong> {order.totalPrice} TL
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      <strong style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>Adres Bilgileri</strong>
                      <br />
                      <strong>Adres:</strong> {order.address.address}
                      <br />
                      <strong>Şehir:</strong> {order.address.city}
                      <br />
                      <strong>Ülke:</strong> {order.address.country}
                      <br />
                      <strong>Posta Kodu:</strong> {order.address.zipCode}
                      <br />
                      <strong>Alıcı:</strong> {order.address.receiverName}
                      <br />
                      <strong>Telefon:</strong> {order.address.receiverPhone}
                    </p>
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
                      <TableCell>Ürün Resmi</TableCell>
                      <TableCell>Ürün Adı</TableCell>
                      <TableCell>Fiyat</TableCell>
                      <TableCell>Miktar</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          <CardMedia
                            component="img"
                            alt={item.name}
                            height="50"
                            image={item.imageUrl}
                            title={item.name}
                          />
                        </TableCell>
                        <TableCell>
                          {item.name}
                        </TableCell>
                        <TableCell>{item.price} TL</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {(order.status === OrderStatus.Pending && !item.isCancelled) && (
                            <Button sx={{
                              textTransform: "none"
                            }} onClick={() => handleCancelItem(item.id)}>İptal Et</Button>
                          )}
                          {(order.status === OrderStatus.Cancelled) && (
                            <Typography color="primary" >Sipariş İptal Edildi</Typography>
                          )}
                          {(order.status !== OrderStatus.Cancelled && item.isCancelled) && (
                            <Typography color="primary" >Ürün İptal Edildi</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    )
  }

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  }
  const renderSearchAndFilterBox = () => {
    return (
      <Box p={2}>
        <TextField
          label="Ara"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" size="small" style={{ marginLeft: 10 }}>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">Hepsi</MenuItem>
            {Object.values(OrderStatus).map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    )

  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <TableContainer component={Paper}>
          {renderSearchAndFilterBox()}
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
              {paginatedOrders.map(order => (
                <React.Fragment key={order.id}>
                  {renderTableBodyParentRow(order)}
                  {renderTableBodySubRow(order)}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sortedOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
