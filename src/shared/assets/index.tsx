import React from 'react';
import { useAtomValue } from 'jotai/utils';

import { themeAtom } from 'shared/atoms';
import { SvgElement } from 'shared/types';

import { ReactComponent as LogoLight } from './logo.svg';
import { ReactComponent as LogoDark } from './logo-dark.svg';

export const Logo: SvgElement = (props) => {
  const theme = useAtomValue(themeAtom);

  return theme === 'light' ? <LogoLight {...props} /> : <LogoDark {...props} />;
};

export { ReactComponent as LoaderIcon } from './infinity-loader.svg';
export { ReactComponent as LogoIcon } from './logo-icon.svg';
