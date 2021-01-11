import * as React from 'react';

import { ServiceContext } from './service.context';

export const useService = (): ServiceContext => {
  const serviceContext = React.useContext(ServiceContext);

  if (!serviceContext) {
    throw new Error('useService must be used within ServiceProvider');
  }

  return serviceContext;
};
