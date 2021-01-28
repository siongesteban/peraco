import React from 'react';

import { useThemeMode } from 'system/theme';
import { SvgElement } from 'shared/types';

import { ReactComponent as EmptyWalletListIllustrationLight } from './empty-wallet-list-illustration.svg';
import { ReactComponent as EmptyWalletListIllustrationDark } from './empty-wallet-list-illustration-dark.svg';

export const EmptyWalletListIllustration: SvgElement = (props) => {
  const theme = useThemeMode();

  return theme === 'light' ? (
    <EmptyWalletListIllustrationLight {...props} />
  ) : (
    <EmptyWalletListIllustrationDark {...props} />
  );
};
