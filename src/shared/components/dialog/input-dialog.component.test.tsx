import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import { InputDialog } from './input-dialog.component';

test('Renders correctly when given all props', () => {
  render(
    <InputDialog
      open
      title="Enter name"
      onCancel={jest.fn()}
      onSubmit={jest.fn()}
    >
      <div>Hello</div>
    </InputDialog>,
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText(/enter name/i)).toBeInTheDocument();
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
  expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  expect(screen.getByText(/ok/i)).toBeInTheDocument();
});

test('Calls the event callbacks', () => {
  const handleCancel = jest.fn();
  const handleSubmit = jest.fn();

  render(
    <InputDialog
      open
      title="Enter name"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    >
      <div>Hello</div>
    </InputDialog>,
  );

  fireEvent.click(screen.getByText(/cancel/i));
  expect(handleCancel).toHaveBeenCalled();

  fireEvent.click(screen.getByText(/ok/i));
  expect(handleSubmit).toHaveBeenCalled();
});
