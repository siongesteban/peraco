import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core';
import { RxDBKeyCompressionPlugin } from 'rxdb/plugins/key-compression';
import { RxDBLocalDocumentsPlugin } from 'rxdb/plugins/local-documents';
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
import pouchDbAdapterIdb from 'pouchdb-adapter-idb';
import { container } from 'tsyringe';

import { userSchema } from './schemas';
import { DbCollections } from './types';

addRxPlugin(pouchDbAdapterIdb);
addRxPlugin(RxDBKeyCompressionPlugin);
addRxPlugin(RxDBLocalDocumentsPlugin);
addRxPlugin(RxDBValidatePlugin);

export const DB_TOKEN = 'DB';

export const createDb = async (): Promise<void> => {
  const db = await createRxDatabase<DbCollections>({
    name: 'peraco',
    adapter: 'idb',
  });

  db.addCollections({
    user: {
      schema: userSchema,
    },
  });

  container.register(DB_TOKEN, {
    useValue: db,
  });
};
