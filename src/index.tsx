import 'reflect-metadata';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { createDb } from 'shared/services/rxdb';
import { Root } from 'app/root';
import 'app/root/root.css';

(async (): Promise<void> => {
  await createDb();

  ReactDOM.render(<Root />, document.getElementById('root'));
})();
