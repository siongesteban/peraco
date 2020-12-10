import * as React from 'react';
import { render, waitForDomChange } from 'test-utils';

import { PageTitle } from './page-title.component';

test('Shows the page title with the right suffix', async () => {
  const title = 'Home';

  render(<PageTitle title={title} />);

  await waitForDomChange();

  expect(document.querySelector('title')).toHaveTextContent(
    `${title} – Peraco`,
  );
});
