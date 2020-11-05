import { ThemeOptions } from '@material-ui/core';

export const BASE_THEME: ThemeOptions = {
  props: {
    MuiButton: {
      disableElevation: true,
      variant: 'contained',
    },
  },
  palette: {
    primary: {
      dark: '#cb2675',
      light: '#f858a5',
      main: '#ea1c7f',
    },
    secondary: {
      dark: '##1bbb77',
      light: '#5bf9b6',
      main: '#1cea93',
    },
  },
  typography: {
    button: {
      fontWeight: 700,
      letterSpacing: '0.05857em',
      textTransform: 'initial',
    },
    fontFamily: `'IBM Plex Sans', sans-serif`,
  },
};
