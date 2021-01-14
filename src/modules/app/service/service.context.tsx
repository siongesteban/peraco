import * as React from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { CurrencyService, UserService } from 'shared/services';

type State = {
  currencyService: CurrencyService;
  firebaseService: FirebaseService;
  userService: UserService;
};

const ServiceContext = React.createContext<State | undefined>(undefined);

export type ServiceProviderProps = {
  service?: State;
};

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
  service,
}) => {
  const value: State = service || {
    currencyService: CurrencyService.getInstance(),
    firebaseService: FirebaseService.getInstance(),
    userService: UserService.getInstance(),
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export const useService = (): State => {
  const serviceContext = React.useContext(ServiceContext);

  if (!serviceContext) {
    throw new Error('useService must be used within a ServiceProvider');
  }

  return serviceContext;
};
