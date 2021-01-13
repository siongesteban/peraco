import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

export type PageContentProps = {
  disableGutters?: boolean;
  subdued?: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: (props: PageContentProps) => ({
    overflowY: 'auto',
    background: props.subdued ? '#F5F5F5' : undefined,
    padding: props.disableGutters ? undefined : theme.spacing(2),
  }),
}));

export const PageContent: React.FC<PageContentProps> = (props) => {
  const classes = useStyles(props);

  return <div className={classes.root}>{props.children}</div>;
};

PageContent.defaultProps = {
  disableGutters: false,
};
