import React from 'react';

import { useService } from 'system/service';
import { Currency } from 'shared/services';

export const useCurrencies = (): Currency[] => {
  const { currencyService } = useService();
  const [currencies, setCurrencies] = React.useState<Currency[]>([]);

  React.useEffect(() => {
    currencyService.getCurrencies().then((data) => setCurrencies(data));
  }, []);

  return currencies;
};
