import * as React from 'react';

import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { Close as CloseIcon } from '@material-ui/icons';

import { Head, ParentFormProvider, FormFields } from 'shared/components';
import { useForm, useSearchParams } from 'shared/hooks';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

type Fields = {
  name: string;
};

export const CreateWalletDialog: React.FC = () => {
  const { searchParams, navigate } = useSearchParams();
  const form = useForm<Fields>();
  const classes = useStyles();

  const handleClose = (): void => {
    navigate(-1);
    form.reset(undefined, { isDirty: false, isValid: false });
  };

  const handleSubmit = (data: Fields): void => {
    data;
    handleClose();
  };

  const open = searchParams.dialog === 'new-wallet';

  return (
    <>
      {open ? <Head title="Create wallet" /> : null}
      <Dialog
        fullScreen
        data-testid="create-wallet-dialog"
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <ParentFormProvider
          form={form}
          onSubmit={handleSubmit}
          registerOptions={{ name: { required: true } }}
        >
          <AppBar className={classes.appBar} color="transparent" elevation={0}>
            <Toolbar>
              <IconButton
                data-testid="close-button"
                color="inherit"
                edge="start"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" component="h2" className={classes.title}>
                Create wallet
              </Typography>
              <Button
                disabled={!form.formState.isDirty || !form.formState.isValid}
                color="primary"
                size="small"
                type="submit"
              >
                Save
              </Button>
            </Toolbar>
          </AppBar>
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
      </Dialog>
    </>
  );
};
