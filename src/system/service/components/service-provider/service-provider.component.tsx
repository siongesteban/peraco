import React from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { CurrencyService, UserService } from 'shared/services';

import { ServiceContext } from './service.context';

export type ServiceProviderProps = {
  service?: ServiceContext;
};

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
  service,
}) => {
  const value: ServiceContext = service || {
    currencyService: CurrencyService.getInstance(),
    firebaseService: FirebaseService.getInstance(),
    userService: UserService.getInstance(),
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};
