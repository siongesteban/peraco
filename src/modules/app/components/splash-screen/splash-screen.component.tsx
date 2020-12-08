import * as React from 'react';

import { Grid } from '@material-ui/core';

import { Logo } from 'shared/assets';
import { VerticalCenter } from 'shared/components';

export const SplashScreen: React.FC = () => (
  <VerticalCenter>
    <VerticalCenter.Item>
      <Grid container justify="center">
        <Logo role="img" height={32} />
      </Grid>
    </VerticalCenter.Item>
  </VerticalCenter>
);
