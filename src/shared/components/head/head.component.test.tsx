import * as React from 'react';
import { render, waitFor } from 'test-utils';

import { Head } from './head.component';

test('Shows the page title with the right suffix', async () => {
  const title = 'Home';

  render(<Head title={title} />);

  await waitFor(() =>
    expect(document.querySelector('title')).toHaveTextContent(
      `${title} – Peraco`,
    ),
  );
});
