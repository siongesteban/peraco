import * as React from 'react';

import { MainPageContainer } from 'modules/app/main';

import { Wallets } from './wallets.component';

export const WalletsPage: React.FC = () => (
  <MainPageContainer>
    <MainPageContainer.Header title="Wallets" />
    <MainPageContainer.Content subdued>
      <Wallets />
    </MainPageContainer.Content>
  </MainPageContainer>
);
