import { atom } from 'jotai';

import { UserDocType } from 'shared/services/rxdb/schemas';

import { authenticationStatusAtom } from './authentication-status.atom';

export type UserAtom = UserDocType | null;

export const userAtom = atom<UserAtom>(null);

export const setUserAtom = atom<null, UserAtom>(null, (_, set, user) => {
  set(userAtom, user);
  set(
    authenticationStatusAtom,
    user !== null ? 'authenticated' : 'unauthenticated',
  );
});
