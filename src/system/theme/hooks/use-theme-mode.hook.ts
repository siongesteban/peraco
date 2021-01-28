import { useAtomValue } from 'jotai/utils';

import { useMediaQuery } from '@material-ui/core';

import { themeAtom } from 'shared/atoms';

export const useThemeMode = (): 'dark' | 'light' => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useAtomValue(themeAtom);

  const dark = theme === 'dark' || (theme === 'system' && prefersDarkMode);

  return dark ? 'dark' : 'light';
};
