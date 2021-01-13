import * as React from 'react';

import { MainPageContainer } from 'app/main';

import { Wallets } from './wallets.component';

export const WalletsPage: React.FC = () => (
  <MainPageContainer>
    <MainPageContainer.Header title="Wallets" />
    <MainPageContainer.Content subdued>
      <Wallets />
    </MainPageContainer.Content>
  </MainPageContainer>
);
