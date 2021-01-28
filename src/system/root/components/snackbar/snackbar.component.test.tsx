import React from 'react';
import { render, screen, userEvent, waitFor } from 'test-utils';

import { Snackbar } from './snackbar.component';

test('Displays the correct message', () => {
  render(<Snackbar />, {
    initialState: {
      snackbar: {
        open: true,
        message: 'This is a message.',
      },
    },
  });

  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText(/this is a message./i)).toBeInTheDocument();
});

test('Disappears if the dismiss button is clicked', async () => {
  render(<Snackbar />, {
    initialState: {
      snackbar: {
        open: true,
        message: 'Some message',
      },
    },
  });

  const dismissButton = screen.getByText(/dismiss/i);

  userEvent.click(dismissButton);

  await waitFor(() => {
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
