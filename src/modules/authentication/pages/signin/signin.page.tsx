import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import { Logo } from 'shared/assets';
import { PageLoader, VerticalCenter } from 'shared/components';

import {
  FacebookAuthButton,
  GoogleAuthButton,
} from '../../components/social-auth-buttons';
import { UserContext } from '../../contexts';

export const SigninPage: React.FC = () => {
  const userContext = React.useContext(UserContext);

  if (userContext.authenticating) {
    return <PageLoader message={userContext.message} />;
  }

  return (
    <VerticalCenter>
      <VerticalCenter.Item>
        <Grid container justify="center">
          <Logo />
        </Grid>
      </VerticalCenter.Item>
      <VerticalCenter.Item>
        <Typography align="center" variant="subtitle2">
          Welcome to Peraco!
        </Typography>
      </VerticalCenter.Item>
      <VerticalCenter.Item>
        <Typography align="center" variant="subtitle2">
          Choose between the two options below to continue.
        </Typography>
      </VerticalCenter.Item>
      <VerticalCenter.Item>
        <Box>
          <GoogleAuthButton />
        </Box>
        <Box my={2}>
          <FacebookAuthButton />
        </Box>
      </VerticalCenter.Item>
      <VerticalCenter.Item>
        <Typography align="center" variant="subtitle1">
          Using an account, you will be able to access your data across multiple
          devices.
        </Typography>
      </VerticalCenter.Item>
    </VerticalCenter>
  );
};
