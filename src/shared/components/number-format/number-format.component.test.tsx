import * as React from 'react';
import { render } from 'test-utils';

import { NumberFormat } from './number-format.component';

test('Sets the correct currency and default config', () => {
  const { container } = render(<NumberFormat value={13909.391} />, {
    initialState: {
      currency: {
        symbol: '$',
        code: 'USD',
      },
    },
  });

  expect(container.querySelector('span')).toHaveTextContent('$13,909.39');
});
