import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import { FullScreenDialog } from './full-screen-dialog.component';

test('Renders correctly when given all the props', () => {
  render(
    <FullScreenDialog open onClose={jest.fn()}>
      <FullScreenDialog.TitleBar
        actionButton={<button>Submit</button>}
        title="Settings"
        onCloseButtonClick={jest.fn()}
      />
      <div>hello</div>
    </FullScreenDialog>,
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText(/settings/i)).toBeInTheDocument();
  expect(screen.getByText(/submit/i)).toBeInTheDocument();
  expect(
    screen.getByTestId('full-screen-dialog-close-button'),
  ).toBeInTheDocument();
  expect(screen.getByText(/hello/i));
});

test('Calls event callbacks', () => {
  const handleClose = jest.fn();
  const handleCloseButtonClick = jest.fn();

  render(
    <FullScreenDialog open onClose={handleClose}>
      <FullScreenDialog.TitleBar
        actionButton={<button>Submit</button>}
        title="Settings"
        onCloseButtonClick={handleCloseButtonClick}
      />
      <div>hello</div>
    </FullScreenDialog>,
  );

  fireEvent.click(screen.getByTestId('full-screen-dialog-close-button'));
  expect(handleCloseButtonClick).toHaveBeenCalled();

  fireEvent.keyDown(screen.getByRole('dialog'), {
    key: 'Escape',
  });
  expect(handleClose).toHaveBeenCalled();
});

test('Does not show close button if handler is not provided', () => {
  render(
    <FullScreenDialog open>
      <FullScreenDialog.TitleBar title="Settings" />
      <div>hello</div>
    </FullScreenDialog>,
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(
    screen.queryByTestId('full-screen-dialog-close-button'),
  ).not.toBeInTheDocument();
});
