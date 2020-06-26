import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import { DARK_THEME, LIGHT_THEME } from '../../constants';

interface Props {
  dark?: boolean;
}

export const Theme: React.FC<Props> = ({ children, dark }) => (
  <ThemeProvider theme={dark ? DARK_THEME : LIGHT_THEME}>
    {children}
  </ThemeProvider>
);
