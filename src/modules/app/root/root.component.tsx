import * as React from 'react';
import { Provider as GlobalStateProvider } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';

import { CssBaseline } from '@material-ui/core';

import { ThemeProvider } from 'modules/app/theme';
import { Snackbar } from 'modules/app/snackbar';

import { Router } from '../router';
import { ServiceProvider } from '../service';

export const Root: React.FC = () => (
  <React.StrictMode>
    <ServiceProvider>
      <GlobalStateProvider>
        <HelmetProvider>
          <ThemeProvider>
            <CssBaseline />
            <Router />
            <Snackbar />
          </ThemeProvider>
        </HelmetProvider>
      </GlobalStateProvider>
    </ServiceProvider>
  </React.StrictMode>
);
