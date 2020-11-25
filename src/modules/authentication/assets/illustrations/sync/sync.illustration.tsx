import * as React from 'react';

import { Props } from 'shared/types';

import { ReactComponent as SyncDarkIllustration } from './sync.dark.illustration.svg';
import { ReactComponent as SyncLightIllustration } from './sync.light.illustration.svg';

export type SyncIllustrationProps = Props<{
  dark?: boolean;
}>;

export const SyncIllustration: React.FC<SyncIllustrationProps> = ({ dark }) =>
  dark ? <SyncDarkIllustration /> : <SyncLightIllustration />;
