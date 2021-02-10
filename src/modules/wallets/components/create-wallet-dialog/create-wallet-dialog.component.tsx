import React from 'react';

import { Button, Grid } from '@material-ui/core';

import { useQueryParams } from 'system/router';
import {
  FullScreenDialog,
  Head,
  ParentFormProvider,
  FormFields,
} from 'shared/components';
import { useForm } from 'shared/hooks';

type Fields = {
  name: string;
};

export const CreateWalletDialog: React.FC = () => {
  const { queryParams, navigate } = useQueryParams();
  const form = useForm<Fields>();

  const handleClose = (): void => {
    navigate(-1);
    form.reset(undefined, { isDirty: false, isValid: false });
  };

  const handleSubmit = (data: Fields): void => {
    data;
    handleClose();
  };

  const open = queryParams.dialog === 'new-wallet';

  return (
    <>
      {open ? <Head title="Create wallet" /> : null}
      <FullScreenDialog
        data-testid="create-wallet-dialog"
        open={open}
        onClose={handleClose}
      >
        <ParentFormProvider form={form} onSubmit={handleSubmit}>
          <FullScreenDialog.TitleBar
            title="Create Wallet"
            actionButton={
              <Button
                disabled={!form.formState.isDirty || !form.formState.isValid}
                color="primary"
                size="small"
                type="submit"
              >
                Save
              </Button>
            }
          />
          <Grid container direction="column">
            <Grid item>
              <FormFields
                groups={[
                  {
                    title: 'Wallets',
                    fields: [
                      {
                        name: 'name',
                        label: 'Name',
                        placeholder: 'Enter name',
                        rules: { required: true },
                      },
                      {
                        name: 'description',
                        label: 'Description',
                        placeholder: 'Add description',
                      },
                    ],
                  },
                  {
                    title: 'Balance',
                    fields: [
                      {
                        name: 'totalBalance',
                        label: 'Total Balance',
                        placeholder: 'Enter total balance',
                      },
                    ],
                  },
                ]}
              />
            </Grid>
          </Grid>
        </ParentFormProvider>
      </FullScreenDialog>
    </>
  );
};
