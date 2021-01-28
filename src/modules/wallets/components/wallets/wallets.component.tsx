import React from 'react';
import { useAtomValue } from 'jotai/utils';

import { Button, Grid } from '@material-ui/core';
import { AddCircleTwoTone as AddIcon } from '@material-ui/icons';

import { EmptyState } from 'system/main';
import { currencyAtom } from 'shared/atoms';
import { useQueryParams } from 'shared/hooks';

import { CreateWalletDialog } from '../create-wallet-dialog';
import { SelectCurrencyDialog } from '../select-currency-dialog';
import { WalletCard } from '../wallet-card';
import { EmptyWalletListIllustration } from './assets';
import { useWallets } from './use-wallets.hook';

const Empty: React.FC = () => {
  const { setQueryParams } = useQueryParams();
  const currentCurrency = useAtomValue(currencyAtom);

  const handleAddWalletClick = (): void => {
    if (!currentCurrency) {
      setQueryParams({ dialog: 'set-currency' });
      return;
    }

    setQueryParams({ dialog: 'new-wallet' });
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
      <SelectCurrencyDialog />
      <CreateWalletDialog />
    </>
  );
};

export const Wallets: React.FC = () => {
  const wallets = useWallets();

  if (!wallets.length) {
    return <Empty />;
  }

  return (
    <Grid container direction="column" spacing={2}>
      {wallets.map((wallet, i) => (
        <Grid key={i} item>
          <WalletCard {...wallet} />
        </Grid>
      ))}
    </Grid>
  );
};
