import { createTheme } from '../create-theme.util';

export const DARK_THEME = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#201f27',
    },
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#201f27',
      },
    },
    MuiBottomNavigationAction: {
      root: {
        color: '#b1afbf',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#282731',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#201f27',
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#282731',
        color: '#fff',
      },
    },
  },
});
