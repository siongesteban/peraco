import * as React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import { DARK_THEME, LIGHT_THEME } from '../../constants';

export type ThemeProps = {
  dark?: boolean;
};

export const Theme: React.FC<ThemeProps> = ({ children, dark }) => (
  <ThemeProvider theme={dark ? DARK_THEME : LIGHT_THEME}>
    {children}
  </ThemeProvider>
);
