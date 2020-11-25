import * as React from 'react';

import { SvgElement } from 'shared/types';

export type SocialAuthButtonIconProps = Readonly<{
  icon: SvgElement;
}>;

export const SocialAuthButtonIcon: React.FC<SocialAuthButtonIconProps> = ({
  icon: Icon,
}) => <Icon height={24} style={{ marginRight: 5 }} />;
