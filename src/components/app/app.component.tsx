import React from 'react';

import { CssBaseline } from '@material-ui/core';

import { Theme } from 'components';
import { AuthenticationPage } from 'pages';

export const App: React.FC = () => (
  <Theme dark>
    <CssBaseline />
    <AuthenticationPage />
  </Theme>
);
