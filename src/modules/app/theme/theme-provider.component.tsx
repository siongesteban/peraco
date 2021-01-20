import * as React from 'react';
import { useAtomValue } from 'jotai/utils';

import { useMediaQuery } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { themeAtom } from 'shared/atoms';
import { Head } from 'shared/components';

import { DARK_THEME, LIGHT_THEME } from './constants';

export const ThemeProvider: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useAtomValue(themeAtom);

  const dark = theme === 'dark' || (theme === 'system' && prefersDarkMode);

  return (
    <MuiThemeProvider theme={{ ...(dark ? DARK_THEME : LIGHT_THEME) }}>
      <Head themeColor={dark ? '#201f27' : '#ffffff'} />
      {children}
    </MuiThemeProvider>
  );
};
