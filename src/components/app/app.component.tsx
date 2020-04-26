import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { Theme } from 'components';
import { AuthenticationPage } from 'pages';

export const App: React.FC = () => (
  <Theme>
    <CssBaseline />
    <AuthenticationPage />
  </Theme>
);
