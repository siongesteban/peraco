import { renderHook, act } from '@testing-library/react-hooks';
import { UserDocType } from 'shared/services/rxdb/schemas';
import { createWrapper } from 'test-utils';

import { useSignOut } from './use-sign-out.hook';

test('Sets user to null and redirects to /welcome if successful', async () => {
  const { Wrapper, atomValues } = createWrapper({
    browserRouter: true,
    initialState: {
      user: {
        id: 'a',
      } as UserDocType,
    },
  });

  const { result } = renderHook(() => useSignOut(), {
    wrapper: Wrapper,
  });

  expect(atomValues.user?.id).toEqual('a');

  await act(async () => {
    await result.current();
  });

  expect(document.location.pathname).toEqual('/welcome');
  expect(atomValues.user).toBeNull();
});

test('Sets the right error message if failed', async () => {
  const { Wrapper, atomValues, services } = createWrapper({
    initialState: {
      user: {
        id: 'a',
      } as UserDocType,
    },
  });

  const { result } = renderHook(() => useSignOut(), {
    wrapper: Wrapper,
  });

  const { firebaseService } = services;

  jest.spyOn(firebaseService, 'signOut').mockRejectedValue(new Error('Err!'));

  await act(async () => {
    await result.current();
  });

  expect(atomValues.user?.id).toEqual('a');
  expect(atomValues.snackbar.message).toEqual(
    'Something went wrong while signing out.',
  );
  expect(atomValues.snackbar.error).toEqual('Err!');
});
