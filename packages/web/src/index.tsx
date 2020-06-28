import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'modules/app/components';

import 'modules/app/css/app.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
