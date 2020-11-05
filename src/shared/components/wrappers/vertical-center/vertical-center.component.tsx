import React from 'react';

import { Container, Grid } from '@material-ui/core';

import { VerticalCenterItem } from './components';
import { useVerticalCenterStyles } from './vertical-center.styles';

interface VerticalCenter extends React.FC {
  Item: typeof VerticalCenterItem;
}

export const VerticalCenter: VerticalCenter = ({ children }) => {
  const { fullHeight } = useVerticalCenterStyles();

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
