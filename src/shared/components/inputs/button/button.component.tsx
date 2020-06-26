import React from 'react';

import { Button as MuiButton, ButtonProps } from '@material-ui/core';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  ...props
}) => (
  <MuiButton disableElevation variant={variant} {...props}>
    {children}
  </MuiButton>
);
