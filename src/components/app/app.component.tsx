import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import { Theme } from 'components';

export const App: React.FC = () => (
  <Theme>
    <CssBaseline />
    <Button
      data-testid="click-me-btn"
      variant="contained"
      color="primary"
      disableElevation
    >
      Click Me
    </Button>
  </Theme>
);
