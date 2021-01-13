import * as React from 'react';

import { Button, Grid } from '@material-ui/core';
import { AddCircleTwoTone as AddIcon } from '@material-ui/icons';

import { EmptyState } from 'app/main';

import { EmptyWalletListIllustration } from './assets';
import { WalletCard, WalletCardProps } from './wallet-card.component';

const WALLETS: WalletCardProps[] = [
  {
    type: 'card',
    name: 'Personal',
    bank: 'UnionBank',
    number: '0118 1000 7540',
    balance: 56848.63,
    subwalletCount: 4,
  },
  {
    type: 'card',
    name: 'Helpful Human',
    bank: 'Banco de Oro',
    number: '4256 9403 9380',
    balance: 38940.24,
  },
  {
    type: 'card',
    name: 'mClinica',
    bank: 'Banco de Oro',
    balance: 24400.23,
    subwalletCount: 2,
  },
  {
    type: 'cash',
    name: 'On Hand',
    balance: 1593.75,
  },
  {
    type: 'card',
    name: 'Upwork',
    bank: 'UnionBank',
    balance: 24400.23,
  },
];

export const Wallets: React.FC = () => {
  if (!WALLETS.length) {
    return (
      <EmptyState
        illustration={EmptyWalletListIllustration}
        message={
          <>
            Start managing your money by
            <br />
            creating you first wallet!
          </>
        }
        action={
          <Button color="secondary" startIcon={<AddIcon />}>
            Add wallet
          </Button>
        }
      />
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      {WALLETS.map((wallet) => (
        <Grid key={wallet.name} item>
          <WalletCard {...wallet} />
        </Grid>
      ))}
    </Grid>
  );
};
