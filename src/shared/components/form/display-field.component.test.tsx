import * as React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import { DisplayField } from './display-field.component';

test('Displays all the details correctly', () => {
  render(
    <DisplayField label="Name" placeholder="Enter name" text="Cardo Dalisay" />,
  );

  expect(screen.getByText(/name/i)).toBeInTheDocument();
  expect(screen.getByText(/cardo dalisay/i)).toBeInTheDocument();
  expect(screen.queryByText(/enter name/i)).not.toBeInTheDocument();
});

test('Calls onClick prop when clicked', () => {
  const handleClick = jest.fn();

  render(
    <DisplayField
      label="Name"
      placeholder="Enter name"
      text="Cardo Dalisay"
      onClick={handleClick}
    />,
  );

  fireEvent.click(screen.getByText(/cardo dalisay/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('Displays placeholder when there is no text provided', () => {
  render(<DisplayField label="Name" placeholder="Enter name" />);

  expect(screen.queryByText(/enter name/i)).toBeInTheDocument();
});
