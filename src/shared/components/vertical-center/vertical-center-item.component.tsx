import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export const VerticalCenterItem: React.FC = ({ children }) => {
  const { root } = useStyles();

  return (
    <Grid item className={root}>
      {children}
    </Grid>
  );
};
