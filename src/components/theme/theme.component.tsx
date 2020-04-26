import React from 'react';

import { ThemeProvider } from '@material-ui/core';

import { darkTheme } from 'themes';

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);
