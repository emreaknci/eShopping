import React, { useEffect, useState } from 'react';
import { OrderItem, OrderStatus, createFakeOrderData } from '../../../mock/order';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import styles from './MyOrdersPage.style';
import { DialogComponent } from '../../../components/common/DialogComponent';
import { PaginationComponent } from '../../../components/common/PaginationComponent';

const sxValues = {
  p: 2,
  m: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const calculateDateRange = (day: number) => {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() - day);
  return { startDate: start, endDate: end };
}

const dateOptions = [
  { value: "default", label: "Tarih Aralığı Seçiniz" },
  { value: "last30Days", label: "Son 30 Gün", ...calculateDateRange(30) },
  { value: "last3Months", label: "Son 3 Ay", ...calculateDateRange(90) },
  { value: "last6Months", label: "Son 6 Ay", ...calculateDateRange(180) },
  { value: "lastYear", label: "Son 1 Yıl", ...calculateDateRange(365) },
  { value: "last2Years", label: "Son 2 Yıl", ...calculateDateRange(365 * 2) },
  { value: "last5Years", label: "Son 5 Yıl", ...calculateDateRange(365 * 5) },
];



const MyOrdersPage = () => {
  const [orders, setOrders] = useState(createFakeOrderData(1, 30)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [filteredOrdersCount, setFilteredOrdersCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dateOption, setDateOption] = useState("default");
  const [filterStatus, setFilterStatus] = useState('All');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [confirmAction, setConfirmAction] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null);

  useEffect(() => {
    const filterByDate = orders.filter(order => {
      if (dateOption === "default") {
        return true;
      }
      const orderDate = new Date(order.orderDate);
      const selectedDateOption = dateOptions.find(option => option.value === dateOption);
      if (selectedDateOption && 'endDate' in selectedDateOption) {
        return orderDate.getTime() >= selectedDateOption.endDate.getTime();
      }
      return false;
    });

    const filteredOrders = filterByDate.filter(order => {
      const statusMatch = filterStatus === 'All' || order.status === filterStatus;

      return statusMatch;
    });


    setFilteredOrdersCount(filteredOrders.length);

    if (currentPage > Math.ceil(filteredOrders.length / itemsPerPage)) {
      setCurrentPage(1);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedOrders = filteredOrders.slice(startIndex, endIndex);
    setFilteredOrders(slicedOrders);

  }, [orders, currentPage, itemsPerPage, dateOption, filterStatus]);





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

  const maskCardNumber = (cardNumber: any) => {
    const lastFourDigits = cardNumber.slice(-4);
    const maskedDigits = '*'.repeat(cardNumber.length - 4);
    return maskedDigits + lastFourDigits;
  }

  const renderPaymentDetails = (payment: any) => {
    return (
      <>
        <Typography variant="h5" fontWeight="bold">Ödeme Bilgileri</Typography>
        <Typography variant="h6" >Ödeme Tipi: {payment.paymentType} </Typography>
        <Typography variant="h6">
          Kart Numarası: {maskCardNumber(payment.cardNumber)}
        </Typography>
        <Typography variant="h6" >Kargo Ücreti: {payment.shippingCost ? payment.shippingCost + "TL" : "BEDAVA"} </Typography>
        <Typography variant="h6" >Toplam Tutar: {payment.amount} TL</Typography>
        <Typography variant="h6" >Genel Toplam: {payment.amount + (payment.shippingCost || 0)} TL</Typography>
      </>
    )
  }

  const renderAddressDetails = (address: any) => {
    return (
      <>
        <Typography variant="h5" fontWeight="bold">Adres Bilgileri</Typography>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Teslimat Adresi:</Typography>
            <Typography>{address.address}</Typography>
            <Typography>
              {address.city.toLocaleUpperCase()} / {address.country.toLocaleUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography variant="h6">Fatura Adresi:</Typography>
            <Typography>{address.address}</Typography>
            <Typography>
              {address.city.toLocaleUpperCase()} / {address.country.toLocaleUpperCase()}
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  }

  const renderOrderItem = (item: any, orderStatus: any) => {
    return (
      <>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} >
              <img src={item.imageUrl} alt={item.name} width="100%" />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant='h5' fontWeight={"bold"}>{item.name}</Typography>
              <Typography><strong>Ürün Birim Fiyatı: </strong>{item.price} TL</Typography>
              <Typography><strong>Sipariş Adedi: </strong>{item.quantity} </Typography>
              <Typography><strong>Toplam Fiyat: </strong>
                {(item.quantity * item.price).toFixed(2)} TL
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          {orderStatus === OrderStatus.Pending && !item.isCancelled &&
            <Button onClick={() => handleCancelItem(item.id)}>
              ürünü İptal Et
            </Button>
          }
          {orderStatus === OrderStatus.Pending && item.isCancelled &&
            <Button disabled>
              ürün iptal edildi
            </Button>
          }
          {orderStatus !== OrderStatus.Pending &&
            <Button disabled>
              ürün {orderStatus.toLowerCase()}
            </Button>
          }
        </Grid>
      </>
    )
  }

  const renderOrders = () => {
    return (
      <>
        {filteredOrders.map((order, index) => (
          <Grid item xs={12} key={index}>
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`order-${index}`}
                id={`order-${index}`}
              >
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item sm={1}>
                    <InventoryIcon color="primary" sx={{ fontSize: "2rem" }} />
                  </Grid>
                  <Grid item sm={7}>
                    <Typography align="center">{order.id.substring(0, 3)}*****{order.id.substring(order.id.length - 3, order.id.length)}</Typography>
                    <Typography align="center"><Divider /></Typography>
                    <Typography align="center">{order.orderDate.toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item sm={3}>
                    <Typography align="center" sx={{ ...styles.orderStatusStyles(order.status) }}>
                      Siparişiniz {order.status}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" fontWeight="bold">Ürünler</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {order.orderItems.map((product, index) => (
                        <React.Fragment key={index}>
                          {renderOrderItem(product, order.status)}
                          <Grid item xs={12}>
                            {index !== order.orderItems.length - 1 && <Divider />}
                          </Grid>
                        </React.Fragment>
                      ))}
                      <Grid item md={12}>
                        {order.status === OrderStatus.Pending &&
                          <Button onClick={() => handleCancelOrder(order.id)}>
                            Tüm Siparişi İptal Et
                          </Button>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {renderAddressDetails(order.address)}
                  </Grid>
                  <Grid item sm={12} md={6}>
                    {renderPaymentDetails(order.payment)}
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="body2" >
                      Tarafımıza yapılan ödemelerin kontrolleri yapıldıktan sonra siparişleriniz hazırlanma aşamasına geçecektir.
                      Hazırlanan siparişleriniz kargoya verildiğinde tarafınıza mail yoluyla bilgilendirme yapılacaktır.
                    </Typography>

                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </>
    )
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={10} lg={8} >
        <Paper sx={{ ...sxValues }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" fontWeight="bold">Siparişlerim</Typography>



            </Grid>
            <Grid item xs={12} sm={6} justifyContent={"flex-end"} display={"flex"}>
              <Box mr={1}>
                <Select
                  labelId="dateOptionLabel"
                  id="dateOptionId"
                  defaultValue={"default"}
                  onChange={(e) => setDateOption(e.target.value)}
                >
                  {dateOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box ml={1}>
                <Select
                  labelId="orderStatusLabel"
                  id="orderStatusId"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}

                >
                  <MenuItem value="All">Hepsi</MenuItem>
                  {Object.values(OrderStatus).map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}

                </Select>
              </Box>


            </Grid>

            {renderOrders()}
            <Grid item xs={12}>
              <PaginationComponent
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => { setCurrentPage(page) }}
                pageCount={Math.ceil(filteredOrdersCount / itemsPerPage)}
              />
            </Grid>
          </Grid>
        </Paper>
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

export default MyOrdersPage;
