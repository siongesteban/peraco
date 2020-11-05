import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from 'modules/app/components';
import 'modules/app/css/app.css';

import { firebaseClient } from 'shared/services/firebase';

console.log('Firebase Options', firebaseClient.options);

ReactDOM.render(<Root />, document.getElementById('root'));
