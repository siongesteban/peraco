import React from 'react';

import { Button as MuiButton, ButtonProps } from '@material-ui/core';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <MuiButton disableElevation variant="contained" {...props}>
    {children}
  </MuiButton>
);
