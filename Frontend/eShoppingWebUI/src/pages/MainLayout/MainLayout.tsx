import './MainLayout.css';
import { HomePage } from './HomePage';
import { Route, Routes, } from 'react-router-dom';
import { DetailsPage } from './DetailsPage';
import Navbar from '../../components/mainLayout/Navbar';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Box component="main" sx={{ p:10,pt:0 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Details/:id" element={<DetailsPage />} />
            <Route path="*" element={<>404</>} />
          </Routes>
        </Box>
        <div>MainLayoutPage Footer</div>
    </>
  );
};

export default MainLayout;
