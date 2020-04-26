import React from 'react';

import { ThemeProvider } from '@material-ui/core';

import { darkTheme, lightTheme } from 'themes';

interface Props {
  dark?: boolean;
}

export const Theme: React.FC<Props> = ({ children, dark }) => (
  <ThemeProvider theme={dark ? darkTheme : lightTheme}>
    {children}
  </ThemeProvider>
);
