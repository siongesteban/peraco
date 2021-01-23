import * as React from 'react';
import { useAtomValue } from 'jotai/utils';

import { Button, Grid } from '@material-ui/core';
import { AddCircleTwoTone as AddIcon } from '@material-ui/icons';

import { currencyAtom } from 'shared/atoms';
import { useSearchParams } from 'shared/hooks';
import { EmptyState } from 'modules/app/main';

import { EmptyWalletListIllustration } from './assets';
import { useWallets } from './use-wallets.hook';
import { WalletCard } from './wallet-card.component';
import { SelectCurrencyDialog } from './select-currency-dialog.component';
import { CreateWalletDialog } from './create-wallet-dialog.component';

const Empty: React.FC = () => {
  const { setSearchParams } = useSearchParams();
  const currentCurrency = useAtomValue(currencyAtom);

  const handleAddWalletClick = (): void => {
    if (!currentCurrency) {
      setSearchParams({ dialog: 'set-currency' });
      return;
    }

    setSearchParams({ dialog: 'new-wallet' });
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
