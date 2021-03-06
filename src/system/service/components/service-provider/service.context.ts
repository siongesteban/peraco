import React from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { CurrencyService, UserService } from 'shared/services';

export type ServiceContext = {
  currencyService: CurrencyService;
  firebaseService: FirebaseService;
  userService: UserService;
};

export const ServiceContext = React.createContext<ServiceContext | undefined>(
  undefined,
);

export const useService = (): ServiceContext => {
  const serviceContext = React.useContext(ServiceContext);

  if (!serviceContext) {
    throw new Error('useService must be used within a ServiceProvider');
  }

  return serviceContext;
};
