import React from 'react';

import { CssBaseline } from '@material-ui/core';

import { SigninPage } from 'modules/authentication/pages';
import { Theme } from 'modules/theme/components';

export const Root: React.FC = () => (
  <React.StrictMode>
    <Theme>
      <CssBaseline />
      <SigninPage />
    </Theme>
  </React.StrictMode>
);
