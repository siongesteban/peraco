import * as React from 'react';
import { Provider as GlobalStateProvider } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';

import { CssBaseline } from '@material-ui/core';

import { Head } from 'shared/components';
import { ThemeProvider } from 'modules/app/theme';
import { Snackbar } from 'modules/app/snackbar';

import { Router } from '../router';
import { ServiceProvider } from '../service';

export const Root: React.FC = () => (
  <React.StrictMode>
    <ServiceProvider>
      <GlobalStateProvider>
        <ThemeProvider>
          <CssBaseline />
          <HelmetProvider>
            <Head themeColor="#fff" />
            <Router />
            <Snackbar />
          </HelmetProvider>
        </ThemeProvider>
      </GlobalStateProvider>
    </ServiceProvider>
  </React.StrictMode>
);
