import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { BottomNavigation } from './bottom-navigation.component';

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `
      .
      .
      . 
    `,
  },
});

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {children}
      <BottomNavigation />
    </div>
  );
};