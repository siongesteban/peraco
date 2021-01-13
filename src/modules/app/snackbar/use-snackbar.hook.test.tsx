import * as React from 'react';
import { render, screen, userEvent, waitFor } from 'test-utils';

import { UseSnackbar, useSnackbar } from './use-snackbar.hook';

type Snackbar = ReturnType<UseSnackbar>;

const setup = (): Snackbar => {
  let snackbar: Snackbar | null = null;

  const TestComponent: React.FC = () => {
    snackbar = useSnackbar();

    return null;
  };

  render(<TestComponent />);

  if (!snackbar) {
    throw new Error('Null');
  }

  return snackbar;
};

test('Shows snackbar with the correct message', async () => {
  const snackbar = setup();

  const messageText = 'Some message';

  snackbar.enqueueSnackbar({
    message: messageText,
    variant: 'error',
  });

  const dismissButton = await screen.findByText('Dismiss');
  const message = await screen.findByText(messageText);

  expect(message).toBeInTheDocument();
  expect(dismissButton).toBeInTheDocument();

  userEvent.click(dismissButton);

  await waitFor(() => {
    expect(message).not.toBeInTheDocument();
    expect(dismissButton).not.toBeInTheDocument();
  });
});
