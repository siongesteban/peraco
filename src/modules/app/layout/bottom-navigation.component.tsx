import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Paper,
} from '@material-ui/core';
import {
  AccountBalanceWalletTwoTone as WalletIcon,
  ReceiptTwoTone as TransactionIcon,
  DonutSmallTwoTone as BudgetIcon,
  AccountCircleTwoTone as AccountIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
});

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const pathname = location.pathname.split('/')[1];
  const [value, setValue] = React.useState(pathname);

  React.useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  const handleChange = (
    _: React.ChangeEvent<Record<string, never>>,
    newValue: string,
  ): void => {
    navigate(`/${newValue}`, { replace: true });
  };

  const items: BottomNavigationActionProps[] = [
    {
      value: 'wallets',
      label: 'Wallets',
      icon: <WalletIcon />,
    },
    {
      value: 'transactions',
      label: 'Transactions',
      icon: <TransactionIcon />,
    },
    {
      value: 'budget',
      label: 'Budget',
      icon: <BudgetIcon />,
    },
    {
      value: 'account',
      label: 'Account',
      icon: <AccountIcon />,
    },
  ];

  const renderItems = (): React.ReactNode =>
    items.map((item) => <BottomNavigationAction key={item.value} {...item} />);

  return (
    <Paper className={classes.root} square variant="outlined">
      <MuiBottomNavigation
        value={value}
        showLabels={true}
        onChange={handleChange}
      >
        {renderItems()}
      </MuiBottomNavigation>
    </Paper>
  );
};
