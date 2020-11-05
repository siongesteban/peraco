import React from 'react';

import { CssBaseline } from '@material-ui/core';

import { AuthenticationPage } from 'modules/authentication/pages';
import { Theme } from 'modules/theme/components';

export const App: React.FC = () => (
  <Theme dark>
    <CssBaseline />
    <AuthenticationPage />
  </Theme>
);
