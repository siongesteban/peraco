import React from 'react';

import MuiButton, { ButtonProps } from '@material-ui/core/Button';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <MuiButton disableElevation variant="contained" {...props}>
    {children}
  </MuiButton>
);
