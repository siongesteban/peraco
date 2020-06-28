import React from 'react';
import { render } from '@testing-library/react';

import { App } from './app.component';

test('renders text "Click Me" button', () => {
  const { getByTestId } = render(<App />);

  const button = getByTestId('click-me-btn');
  expect(button).toBeInTheDocument();
});
