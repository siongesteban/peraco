import * as React from 'react';
import { render, screen } from 'test-utils';

import { Loader } from './loader.component';

test('Displays default message', () => {
  render(<Loader />);
  expect(screen.getByRole('heading')).toHaveTextContent('Just a moment...');
});

test('Displays provided message instead of the default', () => {
  const message = 'Loading...';

  render(<Loader />, { initialState: { loaderMessage: message } });

  expect(screen.getByRole('heading')).toHaveTextContent(message);
});
