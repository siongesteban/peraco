import React from 'react';
import { useAtomValue } from 'jotai/utils';
import ReactNumberFormat, { NumberFormatProps } from 'react-number-format';

import { currencyAtom } from 'shared/atoms';

export const NumberFormat: React.FC<NumberFormatProps> = (props) => {
  const currency = useAtomValue(currencyAtom);

  return <ReactNumberFormat prefix={currency?.symbol} {...props} />;
};

NumberFormat.defaultProps = {
  displayType: 'text',
  decimalScale: 2,
  fixedDecimalScale: true,
  thousandSeparator: true,
};
