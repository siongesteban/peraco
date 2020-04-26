import React from 'react';
import { render } from '@testing-library/react';

import { App } from './app.component';

test('renders text "hola"', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/hola/i);
  expect(linkElement).toBeInTheDocument();
});
