import 'reflect-metadata';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { createDb } from 'shared/services/rxdb';
import { Root } from 'modules/app/components';
import 'modules/app/css/app.css';

(async (): Promise<void> => {
  await createDb();

  ReactDOM.render(<Root />, document.getElementById('root'));
})();
