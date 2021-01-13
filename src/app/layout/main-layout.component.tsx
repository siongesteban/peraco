import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { BottomNavigation } from './bottom-navigation.component';
import { Header } from './header.component';

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

export type MainLayoutProps = {
  title: string;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header title={title} />
      <div>{children}</div>
      <BottomNavigation />
    </div>
  );
};
