import * as React from 'react';

import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LogoIcon } from 'shared/assets';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: 60,
  },
  logoContainer: {
    display: 'flex',
    marginRight: theme.spacing(1),
  },
}));

export type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <Paper square variant="outlined">
      <Container>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item className={classes.logoContainer}>
            <LogoIcon width={32} height={32} />
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h1">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
