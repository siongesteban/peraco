import * as React from 'react';
import { useAtomValue } from 'jotai/utils';

import { Button, Container } from '@material-ui/core';

import { userAtom } from 'shared/atoms';
import { PageTitle } from 'shared/components';
import { MainPageContainer } from 'modules/app/main';
import { useSignOut } from 'modules/authentication';

export const AccountPage: React.FC = () => {
  const signOut = useSignOut();
  const user = useAtomValue(userAtom);

  const handleClick = (): void => {
    signOut();
  };

  return (
    <>
      <PageTitle title="Account" />
      <MainPageContainer>
        <MainPageContainer.Header title="Account" />
        <MainPageContainer.Content>
          <Container>
            <Button onClick={handleClick}>Sign Out: {user?.name}</Button>
          </Container>
        </MainPageContainer.Content>
      </MainPageContainer>
    </>
  );
};
