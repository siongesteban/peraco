import { UserCollection, TransactionCollection } from '../schemas';

export type DbCollections = {
  user: UserCollection;
  transaction: TransactionCollection;
};
