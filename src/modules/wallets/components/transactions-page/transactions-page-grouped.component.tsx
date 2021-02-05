import React from 'react';
import { useAtomValue } from 'jotai/utils';
import { format as formatDate } from 'date-fns';
import {
  AutoSizer,
  List as VirtualList,
  WindowScroller,
  Index,
} from 'react-virtualized';
import 'react-virtualized/styles.css';

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { useService } from 'system/service';
import { Shell } from 'system/shell';
import { Head, NumberFormat } from 'shared/components';

import { monthlyTransactionsAtomMap } from './transaction.atom';

export const TransactionsPage: React.FC = () => {
  const listRef = React.useRef<VirtualList | null>(null);
  const [scrollElement, setScrollelement] = React.useState<Element | null>(
    null,
  );
  const [seeding, setSeeding] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const [date, setDate] = React.useState<number>(new Date().getTime());
  const { transactionService } = useService();
  // const { groupedTransactions, totalCount, loading } = useGroupedTransactions();
  const { dailyTransactions: groupedTransactions, totalCount } = useAtomValue(
    monthlyTransactionsAtomMap.all,
  );

  React.useEffect(() => {
    setScrollelement(document.querySelector('#page-container'));
  }, []);

  React.useEffect(() => {
    listRef.current?.recomputeRowHeights();
  }, [totalCount]);

  const getRowHeight = ({ index }: Index) =>
    (groupedTransactions[index].transactions.length + 1) * 60;

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
          {!groupedTransactions.length ? null : (
            <List dense disablePadding>
              <WindowScroller scrollElement={scrollElement || window}>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <VirtualList
                        autoHeight
                        ref={listRef}
                        style={{ outline: 'none' }}
                        height={height}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        rowCount={groupedTransactions.length}
                        rowHeight={getRowHeight}
                        rowRenderer={({ index, key, style }) => {
                          const { date, transactions } = groupedTransactions[
                            index
                          ];

                          return (
                            <div key={key + totalCount} style={style}>
                              <ListItem disableGutters>
                                <ListItemText
                                  primary={formatDate(
                                    transactions[0].createdAt,
                                    'MMMM',
                                  )}
                                  secondary={date.split(':')[1]}
                                />
                              </ListItem>
                              <AutoSizer>
                                {({ height, width }) => (
                                  <VirtualList
                                    style={{ outline: 'none' }}
                                    height={height}
                                    width={width}
                                    rowCount={transactions.length}
                                    rowHeight={60}
                                    rowRenderer={({ index, key, style }) => {
                                      const transaction = transactions[index];

                                      return (
                                        <ListItem
                                          disableGutters
                                          key={key}
                                          style={style}
                                        >
                                          <ListItemText
                                            primary={formatDate(
                                              transaction.createdAt,
                                              'MMMM d, yyyy h:mm a',
                                            )}
                                            secondary={
                                              <>
                                                <NumberFormat
                                                  value={transaction.amount}
                                                />
                                                {' | '}
                                                {transaction.description}
                                              </>
                                            }
                                          />
                                        </ListItem>
                                      );
                                    }}
                                  />
                                )}
                              </AutoSizer>
                              {/* {transactions.map((transaction) => (
                                <ListItem disableGutters key={transaction.id}>
                                  <ListItemText
                                    primary={formatDate(
                                      transaction.createdAt,
                                      'MMMM d, yyyy h:mm a',
                                    )}
                                    secondary={
                                      <>
                                        <NumberFormat
                                          value={transaction.amount}
                                        />
                                        {' | '}
                                        {transaction.description}
                                      </>
                                    }
                                  />
                                </ListItem>
                              ))} */}
                              <Divider />
                            </div>
                          );
                        }}
                        scrollTop={scrollTop}
                        width={width}
                        totalCount={totalCount}
                      />
                    )}
                  </AutoSizer>
                )}
              </WindowScroller>
            </List>
          )}
        </Shell.Content>
      </Shell>
    </>
  );
};
