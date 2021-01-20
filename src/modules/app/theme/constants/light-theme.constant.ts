import { createTheme } from '../create-theme.util';

export const LIGHT_THEME = createTheme({
  palette: {
    type: 'light',
    background: {
      default: '#fff',
    },
    text: {
      primary: '#3f3d56',
    },
  },
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        color: '#3f3d56',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#fff',
      },
    },
  },
});
