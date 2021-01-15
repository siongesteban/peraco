import * as React from 'react';
import { render, screen } from 'test-utils';

import { WalletCard } from './wallet-card.component';

test('Renders all the details correctly', () => {
  const { container } = render(
    <WalletCard
      type="card"
      name="Personal"
      bank="UnionBank"
      number="011810007540"
      balance={56848.63}
      subwalletCount={4}
    />,
    {
      initialState: {
        currency: {
          code: 'PHP',
          symbol: '₱',
          name: 'Philippine peso',
        },
      },
    },
  );

  expect(container.querySelector('h4 > svg > title')).toHaveTextContent('card');
  expect(screen.getByText(/personal/i)).toBeInTheDocument();
  expect(screen.getByText(/Card/)).toBeInTheDocument();
  expect(screen.getByText(/unionbank/i)).toBeInTheDocument();
  expect(screen.getByText(/4 subwallets/i)).toBeInTheDocument();
  expect(screen.getByText(/account number/i)).toBeInTheDocument();
  expect(screen.getByText(/0118 1000 7540/i)).toBeInTheDocument();
  expect(screen.getByText(/total balance/i)).toBeInTheDocument();
  expect(screen.getByText('₱56,848.63')).toBeInTheDocument();
});

test('Renders cash icon if type given type is `cash`', () => {
  const { container } = render(
    <WalletCard type="cash" name="On Hand" balance={1593.75} />,
  );

  expect(container.querySelector('h4 > svg > title')).toHaveTextContent('cash');
});

test('Does not render bank, number and subwallet count if not provided', () => {
  render(<WalletCard type="card" name="Personal" balance={2500} />);

  expect(screen.queryByTestId('bank-name')).not.toBeInTheDocument();
  expect(screen.queryByText(/subwallets/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/account number/i)).not.toBeInTheDocument();
});
