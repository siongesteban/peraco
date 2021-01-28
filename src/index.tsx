import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from 'system/root';
import { createDb } from 'shared/services/rxdb';

import { registerServiceWorker } from './registerServiceWorker';

const init = async (): Promise<void> => {
  await registerServiceWorker();
  await createDb();

  ReactDOM.render(<Root />, document.getElementById('root'));
};

init();
