import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { PageLoader } from './page-loader.component';

test('Displays default message', () => {
  render(<PageLoader />);

  expect(screen.getByRole('heading')).toHaveTextContent('Just a moment...');
});

test('Displays provided message instead of the default', () => {
  const message = 'Loading...';

  render(<PageLoader message={message} />);

  expect(screen.getByRole('heading')).toHaveTextContent(message);
});
