import { useAtomDevtools } from 'jotai/devtools';

import { authenticationAtom } from 'modules/authentication/states';

export const useStateDevTools = (): void => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  useAtomDevtools(authenticationAtom);
};
