import * as React from 'react';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';

import { AuthenticationProvider } from 'app/authentication';
import { ThemeProvider } from 'app/theme';

import { Router } from '../router';
import { ServiceProvider } from '../service';

export const Root: React.FC = () => (
  <React.StrictMode>
    <ServiceProvider>
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
    </ServiceProvider>
  </React.StrictMode>
);
