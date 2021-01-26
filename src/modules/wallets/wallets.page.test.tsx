import React from 'react';
import { render, screen, waitFor, getDocumentTitle } from 'test-utils';

import { WalletsPage } from './wallets.page';

jest.mock('./wallets.component');

test('Displays wallets page correctly', async () => {
  render(<WalletsPage />);

  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.getByRole('heading')).toHaveTextContent('Wallets');

  await waitFor(() => {
    expect(getDocumentTitle()).toBe('Wallets');
  });
});
