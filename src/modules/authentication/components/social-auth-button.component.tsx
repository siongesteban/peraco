import * as React from 'react';

import { Button } from '@material-ui/core';

import { SvgElement } from 'shared/types';

type SocialAuthButtonIconProps = Readonly<{
  icon: SvgElement;
}>;

const SocialAuthButtonIcon: React.FC<SocialAuthButtonIconProps> = ({
  icon: Icon,
}) => <Icon height={24} style={{ marginRight: 5 }} />;

export type SocialAuthButtonProps = Readonly<{
  className?: string;
  icon: SvgElement;
  name: string;
  onClick?: () => void;
}>;

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  className,
  icon,
  name,
  onClick,
}) => (
  <Button
    fullWidth
    className={className}
    startIcon={<SocialAuthButtonIcon icon={icon} />}
    size="large"
    onClick={onClick}
  >
    Continue with {name}
  </Button>
);
