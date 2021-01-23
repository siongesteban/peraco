import * as React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useService } from 'modules/app/service';
import { Head } from 'shared/components';
import { useSearchParams } from 'shared/hooks';
import { Currency } from 'shared/services';

const useCurrencies = () => {
  const { currencyService } = useService();
  const [currencies, setCurrencies] = React.useState<Currency[]>([]);

  React.useEffect(() => {
    currencyService.getCurrencies().then((data) => setCurrencies(data));
  }, []);

  return currencies;
};

const useStyles = makeStyles((theme) => ({
  dividers: {
    padding: 0,
  },
  selected: {
    backgroundColor: theme.palette.primary.main + ' !important',
    '& .MuiTypography-root': {
      color: '#fff',
    },
  },
}));

export type SelectCurrencyDialogProps = {
  onClose?: () => void;
  onSubmit: (currency: Currency) => void;
};

export const SelectCurrencyDialog: React.FC<SelectCurrencyDialogProps> = ({
  onClose,
  onSubmit,
}) => {
  const { searchParams, navigate } = useSearchParams();
  const currencies = useCurrencies();
  const classes = useStyles();
  const [
    selectedCurrency,
    setSelectedCurrency,
  ] = React.useState<Currency | null>(null);

  const handleSelect = (value: Currency): void => {
    setSelectedCurrency(value);
  };

  const handleClose = (): void => {
    setSelectedCurrency(null);
    navigate(-1);
    onClose?.();
  };

  const handleOkClick = (): void => {
    if (!selectedCurrency) {
      return;
    }

    onSubmit(selectedCurrency);
  };

  const open = searchParams.dialog === 'set-currency';

  return (
    <>
      {open ? <Head title="Select currency" /> : null}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Select currency</DialogTitle>
        <DialogContent
          dividers
          classes={{
            dividers: classes.dividers,
          }}
        >
          <List
            height={300}
            width="100%"
            itemData={{
              selectedCurrency,
              currencies,
              selectedStyleClass: classes.selected,
              onSelect: handleSelect,
            }}
            itemCount={currencies.length}
            itemSize={45}
          >
            {Item}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={!selectedCurrency}
            variant="text"
            onClick={handleOkClick}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type ItemProps = Omit<ListChildComponentProps, 'data'> & {
  data: {
    selectedCurrency: Currency | null;
    currencies: Currency[];
    selectedStyleClass: string;
    onSelect: (currency: Currency) => void;
  };
};

const Item: React.FC<ItemProps> = (props) => {
  const { index, data, style } = props;
  const { selectedCurrency, currencies, selectedStyleClass, onSelect } = data;
  const currency = currencies[index];

  const handleClick = (): void => {
    onSelect(currency);
  };

  let currencyCodeText = currency.code;

  if (currency.symbol) {
    currencyCodeText += ` (${currency.symbol})`;
  }

  return (
    <ListItem
      button
      key={index}
      classes={{
        selected: selectedStyleClass,
      }}
      style={style}
      selected={currency.code === selectedCurrency?.code}
      onClick={handleClick}
    >
      <ListItemText
        primary={currencyCodeText}
        primaryTypographyProps={{
          variant: 'button',
        }}
      />
      <ListItemText
        secondary={currency.name}
        secondaryTypographyProps={{
          align: 'right',
          variant: 'subtitle2',
          color: 'textPrimary',
        }}
      />
    </ListItem>
  );
};