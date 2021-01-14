import { atom } from 'jotai';

export type AuthenticationStatusAtom =
  | 'authenticating'
  | 'authenticated'
  | 'unauthenticated'
  | 'signingIn';

export const authenticationStatusAtom = atom<AuthenticationStatusAtom>(
  'unauthenticated',
);
