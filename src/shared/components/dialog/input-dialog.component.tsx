import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialogContent: {
    '&:first-child': {
      paddingTop: 0,
    },
  },
});

export type InputDialogProps = {
  open: boolean;
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
};

export const InputDialog: React.FC<InputDialogProps> = ({
  children,
  open,
  title,
  onCancel,
  onSubmit,
}) => {
  const classes = useStyles();

  return (
    <Dialog fullWidth data-testid="input-dialog" open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="text" color="primary">
          Cancel
        </Button>
        <Button variant="text" color="primary" type="submit" onClick={onSubmit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
