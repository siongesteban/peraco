import React from 'react';
import { Provider as GlobalStateProvider } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';

import { CssBaseline } from '@material-ui/core';

import { ThemeProvider } from 'modules/app/theme';
import { Router } from 'modules/app/router';
import { ServiceProvider } from 'modules/app/service';

import { Snackbar } from '../snackbar';

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
