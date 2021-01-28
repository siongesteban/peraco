import React from 'react';

import { Head } from 'shared/components';
import { Shell } from 'modules/app/shell';

import { Wallets } from '../wallets';

export const WalletsPage: React.FC = () => (
  <>
    <Head title="Wallets" />
    <Shell>
      <Shell.Header title="Wallets" />
      <Shell.Content>
        <Wallets />
      </Shell.Content>
    </Shell>
  </>
);
