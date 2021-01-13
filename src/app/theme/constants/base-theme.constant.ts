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
      // dark: '#cb2675',
      dark: '#ea1c7f',
      light: '#f858a5',
      main: '#ea1c7f',
    },
    secondary: {
      // dark: '##1bbb77',
      dark: '#1cea93',
      light: '#5bf9b6',
      main: '#1cea93',
    },
  },
  typography: {
    h6: {
      fontWeight: 700,
    },
    subtitle2: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 800,
      letterSpacing: '0.05857em',
      textTransform: 'initial',
    },
    fontFamily: `'Nunito', sans-serif`,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 2,
      },
    },
    MuiBottomNavigationAction: {
      label: {
        fontWeight: 700,
      },
    },
  },
};
