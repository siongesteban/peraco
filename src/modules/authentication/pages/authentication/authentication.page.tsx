import React from 'react';

import { Box, Grid, TextField, Typography } from '@material-ui/core';

import { Button } from 'shared/components/inputs';
import { VerticalCenter } from 'shared/components/wrappers';

import { SyncIllustration } from '../../assets/illustrations';

export const AuthenticationPage: React.FC = () => (
  <VerticalCenter>
    <VerticalCenter.Item>
      <Grid container justify="center">
        <SyncIllustration dark />
      </Grid>
    </VerticalCenter.Item>
    <VerticalCenter.Item>
      <Typography gutterBottom align="center" variant="subtitle2">
        Use your registered account to enable real-time data synchronization.
      </Typography>
    </VerticalCenter.Item>
    <VerticalCenter.Item>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Email"
        placeholder="Enter your email..."
        type="email"
        variant="outlined"
      />
      <Box my={2}>
        <Button fullWidth color="primary" size="large">
          Sign In
        </Button>
      </Box>
      <Box my={2}>
        <Button fullWidth color="secondary" size="large">
          Sign Up
        </Button>
      </Box>
      <Box my={2}>
        <Button fullWidth color="default" variant="text" size="large">
          Proceed without an account
        </Button>
      </Box>
    </VerticalCenter.Item>
  </VerticalCenter>
);
