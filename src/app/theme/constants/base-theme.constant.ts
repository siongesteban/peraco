import { ThemeOptions } from '@material-ui/core/styles';

export const BASE_THEME: ThemeOptions = {
  props: {
    MuiButton: {
      disableElevation: true,
      variant: 'contained',
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiCard: {
      elevation: 1,
    },
    MuiTypography: {
      color: 'textPrimary',
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
      root: {
        color: '#3f3d56',
      },
      label: {
        fontWeight: 700,
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 3px 6px -1px rgba(0, 0, 0, 0.12)',
      },
    },
    MuiCardContent: {
      root: {
        padding: 12,
        '&:last-child': {
          paddingBottom: undefined,
        },
      },
    },
    MuiTypography: {
      colorTextPrimary: {
        color: '#3f3d56',
      },
    },
  },
};
