import React from 'react';
import { useSnackbar } from 'notistack';

import { Button } from '@material-ui/core';

import { AppContext, AppContextValues } from '../../contexts';

export const AppProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [values, setValues] = React.useState<AppContextValues>();

  const appContextProviderValue: AppContext = {
    ...values,
    setValues: (values) => setValues((prev) => ({ ...prev, ...values })),
    enqueueErrorMessage: (message) =>
      enqueueSnackbar(message, {
        variant: 'error',
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
      }),
  };

  return (
    <AppContext.Provider value={appContextProviderValue}>
      {children}
    </AppContext.Provider>
  );
};
