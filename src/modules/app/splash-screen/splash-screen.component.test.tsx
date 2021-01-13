import * as React from 'react';
import { render, screen } from 'test-utils';

import { SplashScreen } from './splash-screen.component';

test('Displays logo', () => {
  render(<SplashScreen />);

  expect(
    screen.getByRole('img', { name: /splash-screen-logo/ }),
  ).toBeInTheDocument();
});
