import localForage from 'localforage';
import { container } from 'tsyringe';

export const LOCAL_DB_TOKEN = 'LOCAL_DB';

const localDb = localForage.createInstance({
  name: 'peraco_local',
  driver: localForage.INDEXEDDB,
});

container.register(LOCAL_DB_TOKEN, {
  useValue: localDb,
});
