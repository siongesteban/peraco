import * as React from 'react';

import { Container } from '@material-ui/core';

import { MainPageContainer } from 'app/main';

export const WalletsPage: React.FC = () => (
  <MainPageContainer>
    <MainPageContainer.Header title="Wallets" />
    <MainPageContainer.Content>
      <Container>
        <p>Wallets page here...</p>
      </Container>
    </MainPageContainer.Content>
  </MainPageContainer>
);
