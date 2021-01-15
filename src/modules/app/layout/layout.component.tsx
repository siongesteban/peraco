import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { BottomNavigation } from './bottom-navigation.component';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    gridTemplateAreas: '"." "."',
  },
  pageContainer: {
    overflowY: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: '"." "." "."',
  },
});

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div id="page-container" className={classes.pageContainer}>
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
};
