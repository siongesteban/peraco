import 'reflect-metadata';
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getDocumentTitle,
  getSearchParams,
  CustomRenderOptions,
} from 'test-utils';

import { useQueryParams } from 'system/router';

import { useCurrencies } from './use-currencies.hook';
import { SelectCurrencyDialog } from './select-currency-dialog.component';

jest.mock('./use-currencies.hook');

const mockedUseCurrencies = useCurrencies as jest.MockedFunction<
  typeof useCurrencies
>;

const Wrapper: React.FC = ({ children }) => {
  const { setQueryParams } = useQueryParams();

  return (
    <>
      <button onClick={() => setQueryParams({ dialog: 'set-currency' })}>
        open
      </button>
      {children}
    </>
  );
};

const setup = (options?: CustomRenderOptions) =>
  render(
    <Wrapper>
      <SelectCurrencyDialog />
    </Wrapper>,
    options,
  );

test('Only opens if the required query param is set', async () => {
  mockedUseCurrencies.mockReturnValue([]);

  setup();

  expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText(/open/i));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('Displays the content correctly', async () => {
  mockedUseCurrencies.mockReturnValue([
    {
      code: 'PHP',
      symbol: 'P',
      name: 'Philippine Peso',
    },
    {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
    },
  ]);

  setup();

  fireEvent.click(screen.getByText(/open/i));

  await waitFor(() => {
    expect(getDocumentTitle()).toEqual('Select currency');
  });

  expect(screen.getByText(/select currency/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /php \(p\) philippine peso/i }));
  expect(screen.getByRole('button', { name: /usd \(\$\) us dollar/i }));
  expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});

test('Only enables ok button when a currency is selected', () => {
  mockedUseCurrencies.mockReturnValue([
    {
      code: 'PHP',
      symbol: 'P',
      name: 'Philippine Peso',
    },
  ]);

  setup();

  fireEvent.click(screen.getByText(/open/i));

  expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();

  fireEvent.click(
    screen.getByRole('button', { name: /php \(p\) philippine peso/i }),
  );

  expect(screen.getByRole('button', { name: /ok/i })).not.toBeDisabled();
});

test('Closes if cancel button is clicked', () => {
  mockedUseCurrencies.mockReturnValue([]);

  setup();

  fireEvent.click(screen.getByText(/open/i));

  expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

  expect(screen.queryByRole('dalog')).not.toBeInTheDocument();
});

test('Closes and opens create wallet dialog if ok button is clicked', async () => {
  mockedUseCurrencies.mockReturnValue([
    {
      code: 'PHP',
      symbol: 'P',
      name: 'Philippine Peso',
    },
  ]);

  setup({ browserRouter: true });

  fireEvent.click(screen.getByText(/open/i));

  fireEvent.click(
    screen.getByRole('button', { name: /php \(p\) philippine peso/i }),
  );

  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  expect(getSearchParams().dialog).toEqual('new-wallet');
});
