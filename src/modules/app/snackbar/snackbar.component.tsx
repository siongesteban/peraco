import * as React from 'react';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { Button, Snackbar as MuiSnackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  snackbarAtom,
  closeSnackbarAtom,
  SnackbarAppearance,
} from 'shared/atoms';

const useStyles = makeStyles({
  root: {
    bottom: (params: { appearance?: SnackbarAppearance | null }) => {
      const { appearance } = params;

      if (appearance?.overBottomNavigation) {
        return 65;
      }

      return 8;
    },
  },
});

export const Snackbar: React.FC = () => {
  const { open, message, appearance } = useAtomValue(snackbarAtom);
  const closeSnackbar = useUpdateAtom(closeSnackbarAtom);

  const classes = useStyles({ appearance });

  const handleClose = (): void => {
    closeSnackbar();
  };

  return (
    <MuiSnackbar
      className={classes.root}
      open={open}
      message={message}
      autoHideDuration={5000}
      action={
        <Button
          color="secondary"
          variant="text"
          size="small"
          onClick={handleClose}
        >
          Dismiss
        </Button>
      }
      onClose={handleClose}
    />
  );
};
