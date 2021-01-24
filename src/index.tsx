import 'reflect-metadata';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { createDb } from 'shared/services/rxdb';
import { Root } from 'modules/app/root';
import 'modules/app/root/root.css';

import { registerServiceWorker } from './registerServiceWorker';

const init = async (): Promise<void> => {
  registerServiceWorker();

  await createDb();

  ReactDOM.render(<Root />, document.getElementById('root'));
};

init();
