import * as React from 'react';
import { useSnackbar as useNotistack, VariantType } from 'notistack';

import { Button } from '@material-ui/core';

export type EnqueueSnackbar = (params: {
  message: string;
  variant: VariantType;
}) => void;

export type UseSnackbar = () => { enqueueSnackbar: EnqueueSnackbar };

export const useSnackbar: UseSnackbar = () => {
  const { enqueueSnackbar: enqueue, closeSnackbar: close } = useNotistack();

  const enqueueSnackbar: EnqueueSnackbar = (params) => {
    enqueue(params.message, {
      variant: params.variant,
      // eslint-disable-next-line react/display-name
      action: (key) => (
        <Button color="inherit" variant="text" onClick={(): void => close(key)}>
          Dismiss
        </Button>
      ),
    });
  };

  return { enqueueSnackbar };
};
