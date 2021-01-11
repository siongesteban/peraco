import * as React from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { UserService } from 'shared/services/rxdb';

export type ServiceContext = {
  firebaseService: FirebaseService;
  userService: UserService;
};

export const ServiceContext = React.createContext<ServiceContext | undefined>(
  undefined,
);
