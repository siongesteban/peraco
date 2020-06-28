import React from 'react';

import { Grid } from '@material-ui/core';

import { useVerticalCenterItemStyles } from './vertical-center-item.styles';

export const VerticalCenterItem: React.FC = ({ children }) => {
  const { root } = useVerticalCenterItemStyles();

  return (
    <Grid item className={root}>
      {children}
    </Grid>
  );
};
