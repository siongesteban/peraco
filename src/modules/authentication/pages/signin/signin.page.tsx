import React from 'react';

import { Button, Box, Grid, TextField, Typography } from '@material-ui/core';

import { VerticalCenter } from 'shared/components';

import { SyncIllustration } from '../../assets/illustrations';

export const SigninPage: React.FC = () => (
  <VerticalCenter>
    <VerticalCenter.Item>
      <Grid container justify="center">
        <SyncIllustration />
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
    </VerticalCenter.Item>
  </VerticalCenter>
);
