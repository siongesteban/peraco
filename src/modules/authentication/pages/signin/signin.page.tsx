import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import { VerticalCenter } from 'shared/components';

import { SyncIllustration } from '../../assets/illustrations';
import {
  FacebookAuthButton,
  GoogleAuthButton,
} from '../../components/social-auth-buttons';
import { UserContext } from '../../contexts';

export const SigninPage: React.FC = () => {
  const userContext = React.useContext(UserContext);

  return (
    <VerticalCenter>
      <VerticalCenter.Item>
        <Grid container justify="center">
          <SyncIllustration />
        </Grid>
      </VerticalCenter.Item>
      <VerticalCenter.Item>
        <Typography align="center" variant="subtitle2">
          Use your registered account to enable real-time data synchronization.
        </Typography>
        <Typography align="center" variant="subtitle2">
          <strong>User:</strong> {userContext.user?.name || 'none'}
        </Typography>
      </VerticalCenter.Item>
      <VerticalCenter.Item>
        <Box my={2}>
          <GoogleAuthButton />
        </Box>
        <Box my={2}>
          <FacebookAuthButton />
        </Box>
      </VerticalCenter.Item>
    </VerticalCenter>
  );
};
