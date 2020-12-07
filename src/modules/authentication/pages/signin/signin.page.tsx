import * as React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import { Logo } from 'shared/assets';
import { PageLoader, PageTitle, VerticalCenter } from 'shared/components';

import { FacebookAuthButton, GoogleAuthButton } from '../../components';
import { useAuthenticationState } from '../../states';

export const SigninPage: React.FC = () => {
  const { isAuthenticating, message } = useAuthenticationState();

  if (isAuthenticating) {
    return <PageLoader message={message} />;
  }

  return (
    <>
      <PageTitle title="Welcome" />
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
      </VerticalCenter>
    </>
  );
};
