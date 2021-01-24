import * as React from 'react';
import { RegisterOptions } from 'react-hook-form';

import { List, ListSubheader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TextField } from './text-field.component';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

type Field = {
  name: string;
  label: string;
  placeholder: string;
  rules?: RegisterOptions;
};

type FormGroup = {
  title: string;
  fields: Field[];
};

export type FormFieldsProps = {
  groups: FormGroup[];
};

export const FormFields: React.FC<FormFieldsProps> = ({ groups }) => {
  const classes = useStyles();

  return (
    <>
      {groups.map((group) => (
        <List
          key={group.title}
          disablePadding
          component="div"
          subheader={
            <ListSubheader component="div">
              <Typography
                className={classes.header}
                color="primary"
                variant="subtitle2"
              >
                {group.title}
              </Typography>
            </ListSubheader>
          }
        >
          {group.fields.map(({ name, label, placeholder }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
            />
          ))}
        </List>
      ))}
    </>
  );
};
