import './UserLayout.css';
import { ProfilePage } from './ProfilePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './DashboardPage';
import Navbar from '../../components/userLayout/Navbar';
import { Box } from '@mui/material';
import { OrdersPage } from './OrdersPage';
import { MyOrdersPage } from './MyOrdersPage';
import { CustomersPage } from './CustomersPage';

const UserLayout = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 3 }, pt: { xs: 10, md: 10 } }}>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route path="/Orders" element={<OrdersPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="*" element={<Navigate to={"/page-not-found"} />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default UserLayout;
