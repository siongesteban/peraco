import React from 'react';
import { RegisterOptions } from 'react-hook-form';

import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core';

import { useQueryParams } from 'system/router';
import { InputDialog } from 'shared/components';

import { DisplayField } from './display-field.component';
import { useParentForm } from './parent-form.context';

export type TextFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  rules?: RegisterOptions;
};

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  rules,
}) => {
  const { queryParams, setQueryParams, navigate } = useQueryParams();
  const { register, watch, setValue } = useParentForm();
  const [fieldValue, setFieldValue] = React.useState('');

  React.useEffect(() => {
    if (rules) {
      register({ name }, rules);
      return;
    }

    register({ name });
  }, []);

  const open = queryParams.subdialog === 'field' && queryParams.field === name;

  const currentValue = watch(name);

  const handleCancel = (): void => {
    setFieldValue(currentValue);
    navigate(-1);
  };

  const handleDisplayFieldClick = (): void => {
    setQueryParams({
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
      <InputDialog
        open={open}
        title={placeholder}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
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
      </InputDialog>
    </>
  );
};
