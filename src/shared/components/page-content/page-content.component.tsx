import React from 'react';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export type PageContentProps = {
  subdued?: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: (props: PageContentProps) => ({
    background: props.subdued ? '#F5F5F5' : undefined,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  }),
}));

export const PageContent: React.FC<PageContentProps> = (props) => {
  const classes = useStyles(props);

  return <Container className={classes.root}>{props.children}</Container>;
};
