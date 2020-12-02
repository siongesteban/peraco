import * as React from 'react';
import { useSnackbar } from 'notistack';

import { Button } from '@material-ui/core';

import { useAppErrorState, useAppErrorAction } from '../states';

export const useAppErrorEffect = (): void => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const appErrorState = useAppErrorState();
  const { setAppError } = useAppErrorAction();

  const message = appErrorState?.message;

  React.useEffect(() => {
    if (!message) {
      return;
    }

    enqueueSnackbar(message, {
      variant: 'error',
      onClose: () => {
        setAppError(null);
      },
      // eslint-disable-next-line react/display-name
      action: (key) => (
        <Button
          color="inherit"
          variant="text"
          onClick={(): void => closeSnackbar(key)}
        >
          Dismiss
        </Button>
      ),
    });
  }, [message]);
};
