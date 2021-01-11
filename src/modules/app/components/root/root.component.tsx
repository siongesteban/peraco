import * as React from 'react';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';

import { AuthenticationProvider } from 'modules/authentication/components';
import { ThemeProvider } from 'modules/theme/components';

import { Router } from '../router';
import { ServiceProvider } from '../service-provider';

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
