import './DashboardPage.css';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import AnnualOrderStatistics from '../../../components/userLayout/dashboardPage/AnnualOrderStatistics';
import ProductPieChart from '../../../components/userLayout/dashboardPage/ProductPieChart';
import LowStockProducts from '../../../components/userLayout/dashboardPage/LowStockProducts';
import OrdersRevenueAndCount from '../../../components/userLayout/dashboardPage/OrdersRevenueAndCount';
import LatestOrders from '../../../components/userLayout/dashboardPage/LatestOrders';

const DashboardPage = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid container spacing={3} >
        <Grid item xs={12} >
          <Typography variant="h4">
            Dashboard
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={5} xl={4} >
          <ProductPieChart />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={7} xl={8} >
          <OrdersRevenueAndCount />
        </Grid>

        {/* {!isMediumScreen && <Grid item xs={12} sm={12} >
          <AnnualOrderStatistics />
        </Grid>} */}

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <LatestOrders />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <LowStockProducts />
        </Grid>
      </Grid >
    </>
  );
};

export default DashboardPage;