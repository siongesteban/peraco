import React from 'react';

import { ListItem, ListItemText } from '@material-ui/core';

export type DisplayFieldProps = {
  label: string;
  placeholder: string;
  text?: string;
  onClick?: () => void;
};

export const DisplayField: React.FC<DisplayFieldProps> = ({
  label,
  placeholder,
  text,
  onClick,
}) => (
  <ListItem button dense onClick={onClick}>
    <ListItemText
      primary={label}
      primaryTypographyProps={{
        variant: 'subtitle2',
      }}
      secondary={text || placeholder}
      secondaryTypographyProps={{
        color: text ? 'primary' : 'textSecondary',
        variant: 'body1',
      }}
    />
  </ListItem>
);
