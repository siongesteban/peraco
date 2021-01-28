import React from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import { Button, useMediaQuery } from '@material-ui/core';

import { themeAtom, userAtom } from 'shared/atoms';
import { Head } from 'shared/components';
import { Shell } from 'modules/app/shell';
import { useSignOut } from 'modules/authentication';

export const AccountPage: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const signOut = useSignOut();
  const user = useAtomValue(userAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  const handleClick = (): void => {
    signOut();
  };

  return (
    <>
      <Head title="Account" />
      <Shell>
        <Shell.Header title="Account" />
        <Shell.Content>
          <Button
            onClick={() => {
              setTheme((prev) =>
                prev === 'dark'
                  ? 'light'
                  : prev === 'light'
                  ? 'system'
                  : 'dark',
              );
            }}
          >
            current theme: {theme}
            {theme === 'system' ? ` (dark: ${prefersDarkMode})` : ''}
          </Button>
          <Button onClick={handleClick}>Sign Out: {user?.name}</Button>
        </Shell.Content>
      </Shell>
    </>
  );
};
