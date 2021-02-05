import React from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { getDate, getMonth } from 'date-fns';
import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

import { useService } from 'system/service';
import { TransactionDocument } from 'shared/services/rxdb/schemas';

import { monthlyTransactionsAtomMap } from './transaction.atom';

export const useInitializeTransactions = (): void => {
  const { transactionService } = useService();
  const { all } = monthlyTransactionsAtomMap;
  const setMonthlyTransaction = useUpdateAtom(all);

  React.useEffect(() => {
    const sub = transactionService.listSub().subscribe((transactions) => {
      const newGroupedTransactions: {
        date: string;
        transactions: TransactionDocument[];
      }[] = [];

      let newTotalCount = 0;

      from(transactions)
        .pipe(
          groupBy(
            (transaction) =>
              `${getMonth(transaction.createdAt)}:${getDate(
                transaction.createdAt,
              )}`,
            (transaction) => transaction,
          ),
          mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
        )
        .subscribe(
          ([date, transactions]) => {
            newGroupedTransactions.push({
              date,
              transactions,
            });

            newTotalCount += transactions.length;
          },
          () => {
            console.log('err!');
          },
          () => {
            console.log('transactions loaded!');
            const updatedMonthlyTransaction = {
              dailyTransactions: newGroupedTransactions,
              totalCount: newTotalCount,
            };

            setMonthlyTransaction(updatedMonthlyTransaction);
          },
        );
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);
};
