import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

export const VerticalCenterItem: React.FC = ({ children }) => {
  const { root } = useStyles();

  return (
    <Grid item className={root}>
      {children}
    </Grid>
  );
};
