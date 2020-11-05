import React from 'react';

import { Button } from '@material-ui/core';

import { SvgElement } from 'shared/types';
import { SocialAuthButtonIcon } from './social-auth-button-icon.component';

export type SocialAuthButtonProps = Readonly<{
  className?: string;
  icon: SvgElement;
  name: string;
}>;

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  className,
  icon,
  name,
}) => (
  <Button
    fullWidth
    className={className}
    startIcon={<SocialAuthButtonIcon icon={icon} />}
    size="large"
  >
    Continue with {name}
  </Button>
);
