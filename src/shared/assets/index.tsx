import React from 'react';

import { useThemeMode } from 'shared/hooks';
import { SvgElement } from 'shared/types';

import { ReactComponent as LogoLight } from './logo.svg';
import { ReactComponent as LogoDark } from './logo-dark.svg';

export const Logo: SvgElement = (props) => {
  const theme = useThemeMode();

  return theme === 'light' ? <LogoLight {...props} /> : <LogoDark {...props} />;
};

export { ReactComponent as LoaderIcon } from './infinity-loader.svg';
export { ReactComponent as LogoIcon } from './logo-icon.svg';
