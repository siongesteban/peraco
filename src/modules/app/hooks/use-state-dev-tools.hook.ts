import { useAtomDevtools } from 'jotai/devtools';

import { authenticationAtom } from 'modules/authentication/states';

import { appErrorAtom } from '../states';

export const useStateDevTools = (): void => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  useAtomDevtools(appErrorAtom);
  useAtomDevtools(authenticationAtom);
};
