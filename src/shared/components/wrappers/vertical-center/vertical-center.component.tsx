import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { VerticalCenterItem } from './components';

interface VerticalCenter extends React.FC {
  Item: typeof VerticalCenterItem;
}

const useStyles = makeStyles(() =>
  createStyles({
    fullHeight: {
      minHeight: '100%',
    },
  }),
);

const VerticalCenter: VerticalCenter = ({ children }) => {
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

export { VerticalCenter };
