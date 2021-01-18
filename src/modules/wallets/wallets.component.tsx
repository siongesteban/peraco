import * as React from 'react';
import { useAtom } from 'jotai';

import { Button, Grid } from '@material-ui/core';
import { AddCircleTwoTone as AddIcon } from '@material-ui/icons';

import { currencyAtom } from 'shared/atoms';
import { Currency } from 'shared/services';
import { EmptyState } from 'modules/app/main';
import { useSearchParams } from 'modules/app/router';

import { EmptyWalletListIllustration } from './assets';
import { WalletCard, WalletCardProps } from './wallet-card.component';
import { SelectCurrencyDialog } from './select-currency-dialog.component';
import { CreateWalletDialog } from './create-wallet-dialog.component';

const WALLETS: WalletCardProps[] = [
  // {
  //   type: 'card',
  //   name: 'Personal',
  //   bank: 'UnionBank',
  //   number: '011810007540',
  //   balance: 56848.63,
  //   subwalletCount: 4,
  // },
  // {
  //   type: 'card',
  //   name: 'Helpful Human',
  //   bank: 'Banco de Oro',
  //   number: '425694039380',
  //   balance: 38940.24,
  // },
  // {
  //   type: 'card',
  //   name: 'mClinica',
  //   bank: 'Banco de Oro',
  //   balance: 24400.23,
  //   subwalletCount: 2,
  // },
  // {
  //   type: 'cash',
  //   name: 'On Hand',
  //   balance: 1593.75,
  // },
  // {
  //   type: 'card',
  //   name: 'Upwork',
  //   bank: 'UnionBank',
  //   balance: 24400.23,
  // },
  // {
  //   type: 'card',
  //   name: 'Personal',
  //   bank: 'UnionBank',
  //   number: '011810007540',
  //   balance: 56848.63,
  //   subwalletCount: 4,
  // },
  // {
  //   type: 'card',
  //   name: 'Helpful Human',
  //   bank: 'Banco de Oro',
  //   number: '425694039380',
  //   balance: 38940.24,
  // },
  // {
  //   type: 'card',
  //   name: 'mClinica',
  //   bank: 'Banco de Oro',
  //   balance: 24400.23,
  //   subwalletCount: 2,
  // },
  // {
  //   type: 'cash',
  //   name: 'On Hand',
  //   balance: 1593.75,
  // },
  // {
  //   type: 'card',
  //   name: 'Upwork',
  //   bank: 'UnionBank',
  //   balance: 24400.23,
  // },
];

const Empty: React.FC = () => {
  const { setSearchParams } = useSearchParams();
  const [currentCurrency, setCurrency] = useAtom(currencyAtom);

  const handleAddWalletClick = (): void => {
    if (!currentCurrency) {
      setSearchParams({ dialog: 'set-currency' });
      return;
    }

    setSearchParams({ dialog: 'new-wallet' });
  };

  const handleCurrencySelectionDialogSubmit = (currency: Currency): void => {
    setCurrency(currency);
    setSearchParams({ dialog: 'new-wallet' }, { replace: true });
  };

  return (
    <>
      <EmptyState
        illustration={EmptyWalletListIllustration}
        message={
          <>
            Start managing your money by
            <br />
            creating your first wallet!
          </>
        }
        action={
          <Button
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleAddWalletClick}
          >
            Add wallet
          </Button>
        }
      />
      <SelectCurrencyDialog onSubmit={handleCurrencySelectionDialogSubmit} />
      <CreateWalletDialog />
    </>
  );
};

export const Wallets: React.FC = () => {
  if (!WALLETS.length) {
    return <Empty />;
  }

  return (
    <Grid container direction="column" spacing={2}>
      {WALLETS.map((wallet, i) => (
        <Grid key={i} item>
          <WalletCard {...wallet} />
        </Grid>
      ))}
    </Grid>
  );
};
