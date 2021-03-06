import React from 'react';

import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { Close as CloseIcon } from '@material-ui/icons';

const Context = React.createContext<{ onClose: () => void } | undefined>(
  undefined,
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type FullScreenDialogProps = {
  open: boolean;
  onClose: () => void;
};

type FullScreenDialogComponent = React.FC<FullScreenDialogProps> & {
  TitleBar: typeof TitleBar;
};

export const FullScreenDialog: FullScreenDialogComponent = ({
  children,
  open,
  onClose,
}) => (
  <Context.Provider value={{ onClose }}>
    <Dialog
      data-testid="full-screen-dialog"
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      {children}
    </Dialog>
  </Context.Provider>
);

const useTitleBarStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export type FullScreenDialogTitleBarProps = {
  actionButton?: React.ReactNode;
  title: string;
};

const TitleBar: React.FC<FullScreenDialogTitleBarProps> = ({
  actionButton,
  title,
}) => {
  const classes = useTitleBarStyles();
  const context = React.useContext(Context);

  return (
    <AppBar className={classes.appBar} color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          data-testid="full-screen-dialog-close-button"
          color="inherit"
          edge="start"
          onClick={context?.onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" className={classes.title}>
          {title}
        </Typography>
        {actionButton}
      </Toolbar>
    </AppBar>
  );
};

export type FullScreenDialogContentProps = {
  disablePadding?: boolean;
};

FullScreenDialog.TitleBar = TitleBar;
