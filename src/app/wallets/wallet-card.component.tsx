import * as React from 'react';
import { capitalize } from 'lodash';

import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import {
  PaymentTwoTone as CardIcon,
  MoneyTwoTone as CashIcon,
  SvgIconComponent,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

type WalletType = 'cash' | 'card';

export type WalletCardProps = {
  type: WalletType;
  name: string;
  bank?: string;
  number?: string;
  balance: number;
  subwalletCount?: number;
};

const useStyles = makeStyles((theme) => ({
  name: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 800,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const WalletCard: React.FC<WalletCardProps> = ({
  type,
  name,
  bank,
  number,
  balance,
  subwalletCount,
}) => {
  const classes = useStyles();

  const renderIcon = (): React.ReactNode => {
    let Icon: SvgIconComponent = CashIcon;

    if (type === 'card') {
      Icon = CardIcon;
    }

    return <Icon className={classes.icon} color="secondary" />;
  };

  const renderName = (): React.ReactNode => (
    <Grid item>
      <Typography className={classes.name} variant="h5" component="h4">
        {renderIcon()}
        {name}
      </Typography>
      <Typography component="span">
        <Box display="inline" fontSize={12} fontStyle="italic" fontWeight={800}>
          {capitalize(type)}
        </Box>
      </Typography>
      {!bank ? null : (
        <Typography component="span">
          <Box display="inline" fontWeight={100}>
            &nbsp;|
          </Box>
          <Box display="inline" fontSize={12} fontWeight={700}>
            &nbsp;{bank}
          </Box>
        </Typography>
      )}
    </Grid>
  );

  const renderSubwalletCount = (): React.ReactNode =>
    !subwalletCount ? null : (
      <Grid item>
        <Typography component="span">
          <Box fontStyle="italic" fontWeight={100} textAlign="right">
            {subwalletCount} Subwallets
          </Box>
        </Typography>
      </Grid>
    );

  const renderNumber = (): React.ReactNode => (
    <Grid item>
      {!number ? null : (
        <Typography component="span">
          <Box fontWeight={700}>Account Number</Box>
          <Box fontSize={21} fontWeight={800}>
            {number}
          </Box>
        </Typography>
      )}
    </Grid>
  );

  const renderBalance = (): React.ReactNode => (
    <Grid item>
      <Typography component="span">
        <Box fontWeight={700} textAlign="right">
          Total Balance
        </Box>
        <Box fontSize={21} fontWeight={800} textAlign="right">
          ₱{balance}
        </Box>
      </Typography>
    </Grid>
  );

  return (
    <Card>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container justify="space-between" alignItems="flex-start">
              {renderName()}
              {number ? null : (
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    {renderSubwalletCount()}
                    {renderBalance()}
                  </Grid>
                </Grid>
              )}
              {!number ? null : renderSubwalletCount()}
            </Grid>
          </Grid>
          {!number ? null : (
            <Grid item>
              <Grid container justify="space-between" alignItems="flex-start">
                {renderNumber()}
                {renderBalance()}
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
