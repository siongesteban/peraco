import * as React from 'react';
import { Provider as GlobalStateProvider } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';

import { ThemeProvider } from 'modules/app/theme';

import { Router } from '../router';
import { ServiceProvider } from '../service';

export const Root: React.FC = () => (
  <React.StrictMode>
    <ServiceProvider>
      <GlobalStateProvider>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          >
            <HelmetProvider>
              <Router />
            </HelmetProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </GlobalStateProvider>
    </ServiceProvider>
  </React.StrictMode>
);
