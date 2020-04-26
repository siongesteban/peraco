import React from 'react';

import { ReactComponent as SyncDarkIllustration } from './sync.dark.illustration.svg';
import { ReactComponent as SyncLightIllustration } from './sync.light.illustration.svg';

interface Props {
  dark?: boolean;
}

export const SyncIllustration: React.FC<Props> = ({ dark }) =>
  dark ? <SyncDarkIllustration /> : <SyncLightIllustration />;
