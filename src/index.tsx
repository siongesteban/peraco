import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';

import { createDb } from 'shared/services/rxdb';
import { Root } from 'modules/app/root';

import { registerServiceWorker } from './registerServiceWorker';

const init = async (): Promise<void> => {
  await registerServiceWorker();
  await createDb();

  ReactDOM.render(<Root />, document.getElementById('root'));
};

init();
