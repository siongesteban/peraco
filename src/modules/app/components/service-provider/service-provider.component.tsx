import * as React from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { UserService } from 'shared/services/rxdb';

import { ServiceContext } from '../../contexts';

export type ServiceProviderProps = {
  service?: ServiceContext;
};

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
  service,
}) => {
  const value: ServiceContext = service || {
    firebaseService: FirebaseService.getInstance(),
    userService: UserService.getInstance(),
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};
