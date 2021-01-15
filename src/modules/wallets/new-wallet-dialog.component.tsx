import * as React from 'react';

import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { Close as CloseIcon } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export type NewWalletDialog = {
  open: boolean;
  onClose: () => void;
  // onSubmit: (currency: Currency) => void;
};

export const NewWalletDialog: React.FC<NewWalletDialog> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <AppBar className={classes.appBar} color="transparent" elevation={0}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Create wallet
          </Typography>
          <Button color="primary" variant="text" onClick={onClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>Some text</DialogContent>
    </Dialog>
  );
};
