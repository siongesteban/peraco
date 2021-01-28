import React from 'react';

import { Shell } from 'system/shell';
import { Head } from 'shared/components';

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
