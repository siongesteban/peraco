import React from 'react';
import { format as formatDate, isSameDay, getDate } from 'date-fns';
import { AutoSizer, WindowScroller } from 'react-virtualized';
import { VariableSizeList } from 'react-window';

import { Button, List, ListItem, ListItemText } from '@material-ui/core';

import { useService } from 'system/service';
import { Shell } from 'system/shell';
import { Head, NumberFormat } from 'shared/components';
import { TransactionDocument } from 'shared/services/rxdb/schemas';

const useTransactions = () => {
  const { transactionService } = useService();
  const [loading, setLoading] = React.useState(true);
  const [transactions, setTransactions] = React.useState<TransactionDocument[]>(
    [],
  );

  React.useEffect(() => {
    const sub = transactionService.listSub().subscribe((transactions) => {
      setTransactions(transactions);
      setLoading(false);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return { transactions, loading };
};

export const TransactionsPage: React.FC = () => {
  const [scrollElement, setScrollelement] = React.useState<Element | null>(
    null,
  );
  const [seeding, setSeeding] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const [date, setDate] = React.useState<number>(new Date().getTime());
  const { transactionService } = useService();
  const { transactions, loading } = useTransactions();

  React.useEffect(() => {
    setScrollelement(document.querySelector('#page-container'));
  }, []);

  const handleSeed = (): void => {
    setSeeding(true);
    transactionService.seed().then(() => {
      setSeeding(false);
    });
  };

  const handleAdd = (): void => {
    setAdding(true);
    transactionService.add(date).then(() => {
      setAdding(false);
    });
  };

  const handleDateChange: React.InputHTMLAttributes<
    HTMLInputElement
  >['onChange'] = (event): void => {
    console.log(
      'datetime',
      formatDate(new Date(event.target.value), 'MMMM d, yyyy h:mm a'),
    );
    setDate(new Date(event.target.value).getTime());
  };

  return (
    <>
      <Head title="Transactions" />
      <Shell>
        <Shell.Header title="Transactions" />
        <Shell.Content>
          <Button disabled={seeding} onClick={handleSeed}>
            Seed
          </Button>
          <input type="datetime-local" onChange={handleDateChange} />
          <Button disabled={adding} onClick={handleAdd}>
            Add
          </Button>
          {loading || !transactions.length ? null : (
            <AutoSizer>
              {({ height, width }) => (
                <VariableSizeList
                  height={height}
                  width={width}
                  itemCount={transactions.length}
                  itemSize={(index) => {
                    const transaction = transactions[index];
                    const previousTransaction = transactions[index - 1];
                    const newGroup =
                      index === 0 ||
                      !isSameDay(
                        transaction.createdAt,
                        previousTransaction.createdAt,
                      );

                    return newGroup ? 60 * 2 : 60;
                  }}
                >
                  {({ index, style }) => {
                    const transaction = transactions[index];
                    const previousTransaction = transactions[index - 1];

                    return (
                      <div key={index} style={style}>
                        {index === 0 ||
                        !isSameDay(
                          transaction.createdAt,
                          previousTransaction.createdAt,
                        ) ? (
                          <ListItem
                            disableGutters
                            style={{ position: 'sticky' }}
                          >
                            <ListItemText
                              primary="Febuary"
                              secondary={getDate(transaction.createdAt)}
                            />
                          </ListItem>
                        ) : null}
                        <ListItem disableGutters>
                          <ListItemText
                            primary={formatDate(
                              transaction.createdAt,
                              'MMMM d, yyyy h:mm a',
                            )}
                            secondary={
                              <>
                                <NumberFormat value={transaction.amount} />
                                {' | '}
                                {transaction.description}
                              </>
                            }
                          />
                        </ListItem>
                      </div>
                    );
                  }}
                </VariableSizeList>
              )}
            </AutoSizer>
          )}
        </Shell.Content>
      </Shell>
    </>
  );
};
