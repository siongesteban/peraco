import React from 'react';

import { Head } from 'shared/components';
import { MainPageContainer } from 'modules/app/main';

import { Wallets } from './wallets.component';

export const WalletsPage: React.FC = () => (
  <>
    <Head title="Wallets" />
    <MainPageContainer>
      <MainPageContainer.Header title="Wallets" />
      <MainPageContainer.Content>
        <Wallets />
      </MainPageContainer.Content>
    </MainPageContainer>
  </>
);
