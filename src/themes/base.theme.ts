import { ThemeOptions } from '@material-ui/core/styles';

export const baseTheme: ThemeOptions = {
  palette: {
    primary: {
      dark: '#cb2675',
      light: '#f858a5',
      main: '#ea1c7f',
    },
  },
  typography: {
    button: {
      fontWeight: 700,
      letterSpacing: '0.05857em',
      textTransform: 'capitalize',
    },
    fontFamily: `'IBM Plex Sans', sans-serif`,
  },
};
