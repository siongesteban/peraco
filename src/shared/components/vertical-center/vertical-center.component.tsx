import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { VerticalCenterItem } from './vertical-center-item.component';

const useStyles = makeStyles({
  fullHeight: {
    minHeight: '100%',
  },
});

interface VerticalCenter extends React.FC {
  Item: typeof VerticalCenterItem;
}

export const VerticalCenter: VerticalCenter = ({ children }) => {
  const { fullHeight } = useStyles();

  return (
    <Container fixed className={fullHeight}>
      <Grid
        container
        alignItems="center"
        className={fullHeight}
        direction="column"
        justify="center"
        spacing={2}
      >
        {children}
      </Grid>
    </Container>
  );
};

VerticalCenter.Item = VerticalCenterItem;
