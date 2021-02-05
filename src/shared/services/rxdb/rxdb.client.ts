import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core';
import { RxDBKeyCompressionPlugin } from 'rxdb/plugins/key-compression';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
import pouchDbAdapterIdb from 'pouchdb-adapter-idb';
import { container } from 'tsyringe';

import { userSchema, transactionSchema } from './schemas';
import { DbCollections } from './types';

addRxPlugin(RxDBKeyCompressionPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBValidatePlugin);
addRxPlugin(pouchDbAdapterIdb);

export const DB_TOKEN = 'DB';

export const createDb = async (): Promise<void> => {
  const db = await createRxDatabase<DbCollections>({
    name: 'peraco',
    adapter: 'idb',
  });

  await db.addCollections({
    user: {
      schema: userSchema,
    },
    transaction: {
      schema: transactionSchema,
    },
  });

  container.register(DB_TOKEN, {
    useValue: db,
  });
};
