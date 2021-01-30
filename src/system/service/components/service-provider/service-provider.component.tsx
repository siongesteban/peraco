import React from 'react';
import { container } from 'tsyringe';

import { FirebaseService } from 'shared/services/firebase';
import { CurrencyService, UserService } from 'shared/services';

import { ServiceContext } from './service.context';

export const ServiceProvider: React.FC = ({ children }) => {
  const value: ServiceContext = {
    currencyService: container.resolve(CurrencyService),
    firebaseService: container.resolve(FirebaseService),
    userService: container.resolve(UserService),
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};
