import { atom, PrimitiveAtom } from 'jotai';

import { TransactionDocument } from 'shared/services/rxdb/schemas';

export type DailyTransactions = {
  date: string;
  transactions: TransactionDocument[];
};

export type MonthlyTransactions = {
  dailyTransactions: DailyTransactions[];
  totalCount: number;
};

export type MonthlyTransactionsAtom = PrimitiveAtom<MonthlyTransactions>;

export type MonthlyTransactionsAtomMap = Record<'all', MonthlyTransactionsAtom>;

export const monthlyTransactionsAtomMap: MonthlyTransactionsAtomMap = {
  all: atom<MonthlyTransactions>({
    dailyTransactions: [],
    totalCount: 0,
  }),
};
