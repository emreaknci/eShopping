import './MainLayout.css';
import { HomePage } from './HomePage';
import { Route, Routes, useLocation, } from 'react-router-dom';
import { DetailsPage } from './DetailsPage';
import Navbar from '../../components/mainLayout/Navbar';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import Footer from '../../components/mainLayout/Footer';
import { CategoryPage } from './CategoryPage';
import { CartPage } from './CartPage';


const MainLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const shouldShowFooter =
    !['/login', '/register', "/cart"].
      includes(currentPath);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/Details/:id" element={<DetailsPage />} />
        <Route path="/Category/:id" element={<CategoryPage />} />
        <Route path="*" element={<>404</>} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default MainLayout;
