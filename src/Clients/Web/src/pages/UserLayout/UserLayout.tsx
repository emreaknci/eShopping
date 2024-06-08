import './UserLayout.css';
import { ProfilePage } from './ProfilePage';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AddNewAdminPage } from './AdminsPage/AddNewAdminPage';
import { AddCategoryPage } from './CategoriesPage/AddCategoryPage';
import { AddFeaturePage } from './CategoriesPage/AddFeaturePage';
import { BrandsPage } from './BrandsPage';

const UserLayout = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isAuthenticated && authContext.isTokenChecked) {
      navigate("/");
    }
  }, [authContext.isAuthenticated, authContext.isTokenChecked, navigate])
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 3 }, pt: { xs: 10, md: 10 } }}>
          {authContext.isAuthenticated &&
            <Routes>
              <Route path="/" element={<ProfilePage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} />

              {authContext.isAdmin && <>
                <Route path="/Dashboard" element={<DashboardPage />} />
                <Route path="/Orders" element={<OrdersPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/admins" element={<AdminsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/add-new-product" element={<AddNewProductPage />} />
                <Route path="/add-new-admin" element={<AddNewAdminPage />} />
                <Route path="/add-new-category" element={<AddCategoryPage />} />
                <Route path="/add-new-feature" element={<AddFeaturePage />} />
              </>}
              <Route path="*" element={<Navigate to={"/user"} />} />
            </Routes>
          }
        </Box>
      </Box>
    </>
  );
};

export default UserLayout;
