import { atom } from 'jotai';

type Currency = {
  symbol: string;
  code: string;
};

export type CurrencyAtom = Currency | null;

export const currencyAtom = atom<CurrencyAtom>({
  symbol: '₱',
  code: 'PHP',
});
