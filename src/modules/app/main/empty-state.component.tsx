import * as React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export type EmptyStateProps = {
  illustration: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  message: React.ReactNode;
  action?: React.ReactNode;
};

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

export const EmptyState: React.FC<EmptyStateProps> = ({
  illustration: Illustration,
  message,
  action,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Illustration height={150} width={150} />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" component="div">
          <Box textAlign="center">{message}</Box>
        </Typography>
      </Grid>
      {action ? action : null}
    </Grid>
  );
};
