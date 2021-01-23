import * as React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useSearchParams } from 'shared/hooks';

import { DisplayField } from './display-field.component';
import { useParentForm } from './parent-form.context';

export type TextFieldProps = {
  name: string;
  label: string;
  placeholder: string;
};

const useStyles = makeStyles({
  dialogContent: {
    '&:first-child': {
      paddingTop: 0,
    },
  },
});

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
}) => {
  const { searchParams, setSearchParams, navigate } = useSearchParams();
  const {
    parentForm: { register, watch, setValue },
    registerOptions,
  } = useParentForm();
  const classes = useStyles();
  const [fieldValue, setFieldValue] = React.useState('');

  React.useEffect(() => {
    if (registerOptions[name]) {
      register({ name }, registerOptions[name]);
      return;
    }

    register({ name });
  }, []);

  const open =
    searchParams.subdialog === 'field' && searchParams.field === name;

  const currentValue = watch(name);

  const handleCancelClick = (): void => {
    setFieldValue(currentValue);
    navigate(-1);
  };

  const handleDisplayFieldClick = (): void => {
    setSearchParams({
      subdialog: 'field',
      field: name,
    });
  };

  const handleChange: MuiTextFieldProps['onChange'] = (event) => {
    setFieldValue(event.target.value);
  };

  const handleKeyPress: MuiTextFieldProps['onKeyPress'] = (event) => {
    if (event.key === 'Enter') {
      return handleSubmit();
    }
  };

  const handleSubmit = (): void => {
    setValue(name, fieldValue, { shouldDirty: true, shouldValidate: true });
    navigate(-1);
  };

  return (
    <>
      <DisplayField
        label={label}
        placeholder={placeholder}
        text={currentValue}
        onClick={handleDisplayFieldClick}
      />
      <Dialog fullWidth data-testid="text-field-dialog" open={open}>
        <DialogTitle>{placeholder}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <MuiTextField
            autoFocus
            fullWidth
            margin="dense"
            label={label}
            type="text"
            defaultValue={currentValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} variant="text" color="primary">
            Cancel
          </Button>
          <Button
            variant="text"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
