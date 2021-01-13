import * as React from 'react';

import { Button, Container } from '@material-ui/core';

import { useAuthentication, useSignOut } from 'app/authentication';
import { MainPageContainer } from 'app/main';

export const AccountPage: React.FC = () => {
  const signOut = useSignOut();
  const {
    authenticationState: { user },
  } = useAuthentication();

  const handleClick = (): void => {
    signOut();
  };

  return (
    <MainPageContainer>
      <MainPageContainer.Header title="Account" />
      <MainPageContainer.Content>
        <Container>
          <Button onClick={handleClick}>Sign Out: {user?.name}</Button>
        </Container>
      </MainPageContainer.Content>
    </MainPageContainer>
  );
};
