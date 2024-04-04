import './UserLayout.css';
import { ProfilePage } from './ProfilePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './DashboardPage';
import Navbar from '../../components/userLayout/Navbar';
import { Box } from '@mui/material';
import { OrdersPage } from './OrdersPage';
import { MyOrdersPage } from './MyOrdersPage';
import { CustomersPage } from './CustomersPage';
import { AdminsPage } from './AdminsPage';
import CategoriesPage from './CategoriesPage/CategoriesPage';
import { ProductsPage } from './ProductsPage';
import { AddNewProductPage } from './ProductsPage/AddNewProductPage';

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
            <Route path="/admins" element={<AdminsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-new-product" element={<AddNewProductPage />} />
            {/* <Route path="*" element={<Navigate to={"/page-not-found"} />} /> */}
            <Route path="*" element={<Navigate to={"/user"} />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default UserLayout;
