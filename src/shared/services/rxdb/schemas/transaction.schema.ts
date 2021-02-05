import { RxDocument, RxCollection, RxJsonSchema } from 'rxdb';

type DocType = {
  id: string;
};

export type TransactionDocType = DocType & {
  amount: number;
  createdAt: number;
  description: string;
};

export type TransactionDocument = RxDocument<TransactionDocType>;

export type TransactionCollection = RxCollection<TransactionDocType>;

export const transactionSchema: RxJsonSchema<TransactionDocType> = {
  version: 0,
  keyCompression: true,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    amount: {
      type: 'number',
    },
    createdAt: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
  },
  indexes: ['createdAt'],
};
