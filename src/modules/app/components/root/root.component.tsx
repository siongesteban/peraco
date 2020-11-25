import * as React from 'react';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';

import { UserProvider } from 'modules/authentication/components';
import { Theme } from 'modules/theme/components';

import { AppProvider } from '../app-provider';
import { Router } from '../router';

export const Root: React.FC = () => (
  <React.StrictMode>
    <Theme>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <AppProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </AppProvider>
      </SnackbarProvider>
    </Theme>
  </React.StrictMode>
);
