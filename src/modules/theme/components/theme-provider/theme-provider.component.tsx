import * as React from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { DARK_THEME, LIGHT_THEME } from '../../constants';

export type ThemeProviderProps = {
  dark?: boolean;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  dark,
}) => (
  <MuiThemeProvider theme={dark ? DARK_THEME : LIGHT_THEME}>
    {children}
  </MuiThemeProvider>
);
