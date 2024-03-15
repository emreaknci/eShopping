import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from "./pages/MainLayout/MainLayout";
import UserLayout from "./pages/UserLayout/UserLayout";
import { NotFoundPage } from './pages/NotFoundPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useState } from 'react';
import { darkTheme, lightTheme } from './theme.colors';
import { CartProvider } from './contexts/CartContext';
import { SnackBarProvider } from './contexts/SnackBarContext';




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
      <SnackBarProvider>
        <CartProvider>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme ? darkTheme : lightTheme}>
              <CssBaseline />
              <Router>
                <Routes >
                  <Route path="/*" element={<MainLayout />} />
                  <Route path="user/*" element={<UserLayout />} />
                  <Route path="page-not-found" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Router>
            </ThemeProvider>
          </ThemeContext.Provider>
        </CartProvider>
      </SnackBarProvider>
    </>
  );
};

export default App;

