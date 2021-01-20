import * as React from 'react';
import { useAtomValue } from 'jotai/utils';

import { themeAtom } from 'shared/atoms';
import { SvgElement } from 'shared/types';

import { ReactComponent as EmptyWalletListIllustrationLight } from './empty-wallet-list-illustration.svg';
import { ReactComponent as EmptyWalletListIllustrationDark } from './empty-wallet-list-illustration-dark.svg';

export const EmptyWalletListIllustration: SvgElement = (props) => {
  const theme = useAtomValue(themeAtom);

  return theme === 'light' ? (
    <EmptyWalletListIllustrationLight {...props} />
  ) : (
    <EmptyWalletListIllustrationDark {...props} />
  );
};
