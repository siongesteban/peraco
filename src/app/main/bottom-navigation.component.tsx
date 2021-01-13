import * as React from 'react';

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

export const BottomNavigation: React.FC = () => {
  const [value, setValue] = React.useState('wallets');

  const handleChange = (
    _: React.ChangeEvent<Record<string, never>>,
    newValue: string,
  ): void => {
    setValue(newValue);
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
    <Paper square variant="outlined">
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
