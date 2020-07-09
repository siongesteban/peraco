import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import { Props } from 'shared/types';

import { DARK_THEME, LIGHT_THEME } from '../../constants';

export type ThemeProps = Props<{
  dark?: boolean;
}>;

export const Theme: React.FC<ThemeProps> = ({ children, dark }) => (
  <ThemeProvider theme={dark ? DARK_THEME : LIGHT_THEME}>
    {children}
  </ThemeProvider>
);
