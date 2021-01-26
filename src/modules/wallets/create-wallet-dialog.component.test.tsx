import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  userEvent,
  getDocumentTitle,
} from 'test-utils';

import { useSearchParams } from 'shared/hooks';

import { CreateWalletDialog } from './create-wallet-dialog.component';

const Wrapper: React.FC = ({ children }) => {
  const { setSearchParams } = useSearchParams();

  return (
    <>
      <button onClick={() => setSearchParams({ dialog: 'new-wallet' })}>
        open
      </button>
      {children}
    </>
  );
};

const setup = () =>
  render(
    <Wrapper>
      <CreateWalletDialog />
    </Wrapper>,
  );

test('Only opens if the required query string is set', () => {
  setup();

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText(/open/i));

  expect(screen.getByTestId('create-wallet-dialog')).toBeInTheDocument();
});

test('Displays the content correctly', async () => {
  setup();

  fireEvent.click(screen.getByText(/open/i));

  await waitFor(() => {
    expect(getDocumentTitle()).toEqual('Create wallet');
  });

  expect(screen.getByText(/create wallet/i)).toBeInTheDocument();
  expect(screen.getByText(/save/i)).toBeInTheDocument();
  expect(screen.getByText(/save/i)).toBeDisabled();
  expect(screen.getByTestId('close-button')).toBeInTheDocument();

  expect(screen.getByText(/wallets/i)).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText(/enter name/i)).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
  expect(screen.getByText(/add description/i)).toBeInTheDocument();

  expect(screen.getByText('Balance')).toBeInTheDocument();
  expect(screen.getByText('Total Balance')).toBeInTheDocument();
  expect(screen.getByText(/enter total balance/i)).toBeInTheDocument();
});

test('Closes if close button is clicked', async () => {
  setup();

  fireEvent.click(screen.getByText(/open/i));

  fireEvent.click(screen.getByTestId('close-button'));

  await waitFor(() => {
    expect(
      screen.queryByTestId('create-wallet-dialog'),
    ).not.toBeInTheDocument();
  });
});

const fillName = async (name: string) => {
  fireEvent.click(screen.getByText(/enter name/i));

  await waitFor(() => {
    expect(screen.getByTestId('text-field-dialog')).toBeInTheDocument();
  });

  userEvent.type(screen.getByRole('textbox'), name);

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toHaveValue(name);
  });

  fireEvent.click(screen.getByText(/ok/i));

  await waitFor(() => {
    expect(screen.queryByTestId('text-field-dialog')).not.toBeInTheDocument();
  });
};

test('Enables save button if values are valid and closes modal if clicked', async () => {
  setup();

  fireEvent.click(screen.getByText(/open/i));

  await fillName('My Wallet');

  const saveButton = screen.getByText(/save/i);

  expect(saveButton).not.toBeDisabled();

  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(
      screen.queryByTestId('create-wallet-dialog'),
    ).not.toBeInTheDocument();
  });
});

test('Resets form on cancel', async () => {
  setup();

  fireEvent.click(screen.getByText(/open/i));

  await fillName('My Wallet');

  fireEvent.click(screen.getByTestId('close-button'));

  await waitFor(() => {
    expect(
      screen.queryByTestId('create-wallet-dialog'),
    ).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/open/i));

  await waitFor(() => {
    expect(screen.getByTestId('create-wallet-dialog')).toBeInTheDocument();
  });

  expect(screen.queryByText(/my wallet/i)).not.toBeInTheDocument();
  expect(screen.getByText(/save/i)).toBeDisabled();
});

test('Resets form on save', async () => {
  setup();

  fireEvent.click(screen.getByText(/open/i));

  await fillName('My Wallet');

  fireEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(
      screen.queryByTestId('create-wallet-dialog'),
    ).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/open/i));

  await waitFor(() => {
    expect(screen.getByTestId('create-wallet-dialog')).toBeInTheDocument();
  });

  expect(screen.queryByText(/my wallet/i)).not.toBeInTheDocument();
  expect(screen.getByText(/save/i)).toBeDisabled();
});
