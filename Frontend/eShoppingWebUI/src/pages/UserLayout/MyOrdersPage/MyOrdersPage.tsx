import React, { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import styles from './MyOrdersPage.style';
import { DialogComponent } from '../../../components/common/DialogComponent';
import { PaginationComponent } from '../../../components/common/PaginationComponent';
import { DateOption, getIndexForDateOption } from '../../../enums/dateOptions';
import OrderService from '../../../services/order.service';
import OrderListDto from '../../../dtos/orders/orderListDto';
import { OrderStatus, OrderStatusStrings } from '../../../enums/orderStatus';
import OrderDetails from '../../../components/userLayout/myOrdersPage/OrderDetails';
import { LoadingComponent } from '../../../components/common/LoadingComponent';
import OrderDetailDto from '../../../dtos/orders/orderDetailDto';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import StorageService from '../../../services/storage.service';
import { JwtHelper } from '../../../utils/JwtHelper';

const sxValues = {

};


const MyOrdersPage = () => {

  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderListDto>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dateOption, setDateOption] = useState<DateOption>(DateOption.AllTime);
  const [filterStatus, setFilterStatus] = useState('All');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [confirmAction, setConfirmAction] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const accessToken = StorageService.getAccessToken();
    if (accessToken == null) return;
    else
      OrderService.getOrders(currentPage, itemsPerPage, getIndexForDateOption(dateOption), Number(filterStatus), undefined, JwtHelper.getTokenInfos(accessToken).nameidentifier).then((response) => {
        setOrders(response.data);
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      });

  }, [currentPage, itemsPerPage, dateOption, filterStatus]);





  const handleConfirm = (itemId: any) => {
    setOpenAlert(false);
    cancelOrder(itemId);
  };

  const handleCancelOrder = (orderId: any) => {
    setOpenAlert(true);
    setConfirmAction('cancelOrder');
    setAlertText('Sipariş iptal edilecek. Onaylıyor musunuz?');
    setCurrentItemId(orderId)
  }

  const cancelOrder = (orderId: any) => {
    OrderService.updateOrderStatus(orderId, OrderStatus.CancelledByBuyer).then(() => {
      const updatedOrders = orders?.orders.map(order => {
        if (order.orderId === orderId) {
          return { ...order, orderStatus: OrderStatus.CancelledByBuyer };
        }
        return order;
      });
      const updatedOrdersObject = { ...orders, orders: updatedOrders } as OrderListDto;

      setOrders(updatedOrdersObject);
      toast.success('Sipariş iptal edildi.');
    }).catch((error) => {
      console.log(error);
    })
  };

  const renderOrders = () => {
    return (
      <>
        {orders?.orders.map((order, index) => (
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
                  <Grid item sm={6}>
                    <Typography align="center">{order.orderId.substring(0, 3)}*****{order.orderId.substring(order.orderId.length - 3, order.orderId.length)}</Typography>
                    <Typography align="center"><Divider /></Typography>
                    <Typography align="center">{new Date(order.orderDate).toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item sm={order?.orderStatus === OrderStatus.PaymentPending || order?.orderStatus === OrderStatus.PaymentSucceeded ? 3 : 5}>
                    <Typography align='center' sx={{ ...styles.orderStatusStyles(order.orderStatus) }}>
                      {OrderStatusStrings[order.orderStatus as keyof typeof OrderStatusStrings]}
                    </Typography>
                  </Grid>
                  <Grid item sm={2}>
                    {order?.orderStatus === OrderStatus.PaymentPending || order?.orderStatus === OrderStatus.PaymentSucceeded &&
                      <Button onClick={() => handleCancelOrder(order?.orderId)}>
                        İptal Et
                      </Button>
                    }
                  </Grid>
                </Grid>
              </AccordionSummary>
              <OrderDetails orderId={order.orderId} />
            </Accordion>
          </Grid>
        ))}
      </>
    )
  }


  const renderFilterSection = () => {
    const dateOptions = Object.values(DateOption);
    const orderStatusKeys = Object.keys(OrderStatus).filter(key => isNaN(Number(key)));

    return (
      <Grid item xs={12} sm={6} justifyContent={"flex-end"} display={"flex"}>
        <Box mr={1}>
          <Select
            labelId="dateOptionLabel"
            id="dateOptionId"
            defaultValue={"Tüm Zamanlar"}
            value={dateOption}
            onChange={(e) => setDateOption(e.target.value as DateOption)}
          >
            {dateOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
            {orderStatusKeys.map(statusKey => (
              <MenuItem key={OrderStatus[statusKey]} value={OrderStatus[statusKey]}>
                {OrderStatusStrings[OrderStatus[statusKey]]}
              </MenuItem>
            ))}

          </Select>
        </Box>
      </Grid>
    )
  }

  if (loading)
    return <LoadingComponent />

  if (orders === undefined || orders === null)
    return <Typography variant="h6">Siparişler bulunamadı.</Typography>

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item md={12} lg={10} xl={8} >
        <div style={{
          backgroundColor: "transparent", padding: "2rem",
          margin: "1rem", display: 'flex',
          flexDirection: 'column', height: '100%',
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" fontWeight="bold">Siparişlerim</Typography>
            </Grid>
            {renderFilterSection()}
            {renderOrders()}
            {orders && <Grid item xs={12}>
              <PaginationComponent
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => { setCurrentPage(page) }}
                pageCount={orders.totalPages}
              />
            </Grid>}
          </Grid>
        </div>
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

