import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from "./pages/MainLayout/MainLayout";
import UserLayout from "./pages/UserLayout/UserLayout";
import { NotFoundPage } from './pages/NotFoundPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from './theme.colors';
import { CartProvider } from './contexts/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext, AuthProvider } from './contexts/AuthContext';




export const ThemeContext = createContext({ theme: false, toggleTheme: () => { } });

const App = () => {

  const [theme, setTheme] =
    useState(localStorage.getItem('darkMode') === 'true' ? true : false);

  const toggleTheme = () => {
    setTheme(!theme);
    localStorage.setItem('darkMode', (!theme).toString());
  }



  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider>
        <CartProvider>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme ? darkTheme : lightTheme}>
              <CssBaseline />
              <Router>
                <Routes >
                  <Route path="/*" element={<MainLayout />} />
                  <Route path="user/*" element={<UserLayout />} />
                  {/* <Route path="page-not-found" element={<NotFoundPage />} /> */}
                  <Route path="*" element={<MainLayout />} />
                </Routes>
              </Router>
            </ThemeProvider>
          </ThemeContext.Provider>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default App;

