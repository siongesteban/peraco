import * as React from 'react';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';

import { AuthenticationProvider } from 'modules/authentication';
import { ThemeProvider } from 'modules/app/theme';

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
