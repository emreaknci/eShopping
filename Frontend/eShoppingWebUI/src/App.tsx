import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from "./pages/MainLayout/MainLayout";
import UserLayout from "./pages/UserLayout/UserLayout";
import { NotFoundPage } from './pages/NotFoundPage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createContext, useState } from 'react';




export const ThemeContext = createContext({ theme: false, toggleTheme: () => { } });

const App = () => {

  const [theme, setTheme] =
    useState(localStorage.getItem('darkMode') === 'true' ? true : false);

  const toggleTheme = () => {
    setTheme(!theme);
    localStorage.setItem('darkMode', (!theme).toString());
  }

  const darkTheme = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
      primary: {
        main: '#ff4400',
        dark: '#b0272f',
        light: '#ff784e',
      },
      secondary: {
        main: '#19857b',
        dark: '#004c40',
        light: '#4fb3bf',
      },
      background: {
        default: theme ? '#121212' : '#f0f0f0',
        paper: theme ? '#1e1e1e' : '#f0f0f0',
        
      },
    },
  });

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Router>
            <Routes >
              <Route path="/" element={
                <MainLayout />}
              />
              <Route path="user/*" element={<UserLayout />} />
              <Route path="page-not-found" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </ThemeContext.Provider>

    </>
  );
};

export default App;

