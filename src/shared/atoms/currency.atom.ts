import { atom } from 'jotai';

import { Currency } from 'shared/services';

export type CurrencyAtom = Currency | null;

export const currencyAtom = atom<CurrencyAtom>(null);
