import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#cd0000',
      dark: '#b0272f',
      light: '#ff784e',
    },
    secondary: {
      main: '#19857b',
      dark: '#004c40',
      light: '#4fb3bf',
    },
    background: {
      default: '#d0d0d0',
      paper: '#dddddd',
      
    },
    divider: '#e0e0e0',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#dd0000',
      dark: '#b0272f',
      light: '#ff784e',
    },
    secondary: {
      main: '#19857b',
      dark: '#004c40',
      light: '#4fb3bf',
    },
    background: {
      default: '#0a0a0a',
      paper: '#151515',
    },
    divider: '#303030',
  },
});