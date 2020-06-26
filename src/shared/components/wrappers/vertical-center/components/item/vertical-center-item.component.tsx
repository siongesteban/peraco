import React from 'react';

import { createStyles, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(() =>
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
