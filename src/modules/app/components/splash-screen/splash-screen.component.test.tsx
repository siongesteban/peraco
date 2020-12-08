import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { SplashScreen } from './splash-screen.component';

test('Displays logo', () => {
  render(<SplashScreen />);

  expect(screen.getByRole('img')).toBeInTheDocument();
});
