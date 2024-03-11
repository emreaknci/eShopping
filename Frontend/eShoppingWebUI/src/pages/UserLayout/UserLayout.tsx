import './UserLayout.css';
import { ProfilePage } from './ProfilePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './DashboardPage';
import Navbar from '../../components/userLayout/Navbar';
import { Box } from '@mui/material';

const UserLayout = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: 10 }}>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to={"/page-not-found"} />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default UserLayout;
