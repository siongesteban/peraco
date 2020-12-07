import * as React from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';

import { ThemeProvider } from 'modules/theme/components';

import { Router } from '../router';

export const Root: React.FC = () => (
  <React.StrictMode>
    <JotaiProvider>
      <ThemeProvider>
        <CssBaseline />
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </JotaiProvider>
  </React.StrictMode>
);
