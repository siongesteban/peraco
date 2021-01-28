import React from 'react';
import { render, screen, fireEvent, getSearchParams } from 'test-utils';

import { useWallets } from './use-wallets.hook';
import { Wallets } from './wallets.component';

jest.mock('./use-wallets.hook');
jest.mock('./create-wallet-dialog.component');
jest.mock('./select-currency-dialog.component');
jest.mock('./wallet-card.component');

const mockedUseWallets = useWallets as jest.MockedFunction<typeof useWallets>;

test('Displays empty state when there are no wallets', () => {
  mockedUseWallets.mockImplementationOnce(() => []);

  render(<Wallets />);

  expect(screen.getByText(/start managing your money by/i)).toBeInTheDocument();
  expect(screen.getByText(/creating your first wallet!/i)).toBeInTheDocument();
  expect(screen.getByText(/add wallet/i)).toBeInTheDocument();
});

test('Opens select currency dialog if there is no currency set yet', () => {
  mockedUseWallets.mockImplementationOnce(() => []);

  render(<Wallets />, {
    browserRouter: true,
    initialState: { currency: null },
  });

  fireEvent.click(screen.getByText(/add wallet/i));

  expect(getSearchParams().dialog).toBe('set-currency');
});

test('Opens create wallet dialog if there currency is already set', () => {
  mockedUseWallets.mockImplementationOnce(() => []);

  render(<Wallets />, {
    browserRouter: true,
    initialState: { currency: { code: 'USD', name: 'US Dollar', symbol: '$' } },
  });

  fireEvent.click(screen.getByText(/add wallet/i));

  expect(getSearchParams().dialog).toBe('new-wallet');
});

test('Displays wallet cards if there are existing wallets', () => {
  mockedUseWallets.mockImplementationOnce(() => [
    { type: 'cash', name: 'On Hand', balance: 1593.75 },
    { type: 'cash', name: 'On Hand', balance: 1593.75 },
  ]);

  render(<Wallets />, {
    initialState: { currency: { code: 'USD', name: 'US Dollar', symbol: '$' } },
  });

  expect(
    screen.queryByText(/start managing your money by/i),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(/creating your first wallet!/i),
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/add wallet/i)).not.toBeInTheDocument();

  expect(screen.getAllByText(/wallet card/i).length).toBe(2);
});
