import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#DF0000',
      dark: '#b0272f',
      light: '#ff784e',
    },
    secondary: {
      main: '#19857b',
      dark: '#004c40',
      light: '#4fb3bf',
    },
    background: {
      default: '#f0f0f0',
      paper: '#f0f0f0',
      
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#DF0000',
      dark: '#b0272f',
      light: '#ff784e',
    },
    secondary: {
      main: '#19857b',
      dark: '#004c40',
      light: '#4fb3bf',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});