import * as React from 'react';
import ReactNumberFormat, { NumberFormatProps } from 'react-number-format';

import { useSettings } from 'modules/app/settings';

export const NumberFormat: React.FC<NumberFormatProps> = (props) => {
  const { currency } = useSettings();

  return <ReactNumberFormat prefix={currency.symbol} {...props} />;
};

NumberFormat.defaultProps = {
  displayType: 'text',
  decimalScale: 2,
  fixedDecimalScale: true,
  thousandSeparator: true,
};
