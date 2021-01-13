import * as React from 'react';

import { PageTitle } from 'shared/components';
import { MainPageContainer } from 'modules/app/main';

import { Wallets } from './wallets.component';

export const WalletsPage: React.FC = () => (
  <>
    <PageTitle title="Wallets" />
    <MainPageContainer>
      <MainPageContainer.Header title="Wallets" />
      <MainPageContainer.Content subdued>
        <Wallets />
      </MainPageContainer.Content>
    </MainPageContainer>
  </>
);
