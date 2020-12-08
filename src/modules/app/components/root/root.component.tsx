import * as React from 'react';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';

import { AuthenticationProvider } from 'modules/authentication/components';
import { ThemeProvider } from 'modules/theme/components';

import { Router } from '../router';

export const Root: React.FC = () => (
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <AuthenticationProvider>
          <Router />
        </AuthenticationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
