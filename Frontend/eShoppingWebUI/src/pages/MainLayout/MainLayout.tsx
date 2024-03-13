import './MainLayout.css';
import { HomePage } from './HomePage';
import { Route, Routes, } from 'react-router-dom';
import { DetailsPage } from './DetailsPage';
import Navbar from '../../components/mainLayout/Navbar';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Details/:id" element={<DetailsPage />} />
        <Route path="*" element={<>404</>} />
      </Routes>
      <div>MainLayoutPage Footer</div>
    </>
  );
};

export default MainLayout;
