import { renderHook, act } from '@testing-library/react-hooks';
import { createWrapper } from 'test-utils';
import firebase from 'firebase/app';

import { UserDocument } from 'shared/services/rxdb/schemas';

import { useSignIn } from './use-sign-in.hook';

test('Sets error message if user is not found during firebase auth', async () => {
  const { Wrapper, atomValues, services } = createWrapper();
  const { result } = renderHook(() => useSignIn('facebook'), {
    wrapper: Wrapper,
  });

  const { firebaseService } = services;

  jest.spyOn(firebaseService, 'signIn').mockResolvedValue(null);

  await act(async () => {
    await result.current();
  });

  expect(atomValues.user).toBeNull();
  expect(atomValues.snackbar.message).toEqual(
    `Can't sign in. Please try again.`,
  );
  expect(atomValues.snackbar.error).toEqual('User does not exist in firebase.');
});

test('Sets the user if successful', async () => {
  const { Wrapper, atomValues, services } = createWrapper();
  const { result } = renderHook(() => useSignIn('facebook'), {
    wrapper: Wrapper,
  });

  const { currencyService, firebaseService, userService } = services;

  jest
    .spyOn(firebaseService, 'signIn')
    .mockResolvedValue({ displayName: 'siong' } as firebase.User);

  jest.spyOn(userService, 'getUserByAuthId').mockResolvedValue({
    id: 'a',
  } as UserDocument);

  await act(async () => {
    await result.current();
  });

  expect(currencyService.loadCurrencies).toHaveBeenCalled();
  expect(atomValues.user?.id).toEqual('a');
});

test('Does not create a new user if already found in db', async () => {
  const { Wrapper, atomValues, services } = createWrapper();
  const { result } = renderHook(() => useSignIn('facebook'), {
    wrapper: Wrapper,
  });

  const { firebaseService, userService } = services;

  jest
    .spyOn(firebaseService, 'signIn')
    .mockResolvedValue({ displayName: 'siong' } as firebase.User);

  jest.spyOn(userService, 'getUserByAuthId').mockResolvedValue({
    id: 'a',
  } as UserDocument);

  await act(async () => {
    await result.current();
  });

  expect(userService.createUser).not.toHaveBeenCalled();
  expect(atomValues.user?.id).toEqual('a');
});

test('Creates user if not found in db', async () => {
  const { Wrapper, atomValues, services } = createWrapper();
  const { result } = renderHook(() => useSignIn('facebook'), {
    wrapper: Wrapper,
  });

  const { firebaseService, userService } = services;

  const userFromFirebase = {
    displayName: 'siong esteban',
    email: 'siong@example.com',
    uid: '123',
  } as firebase.User;

  jest.spyOn(firebaseService, 'signIn').mockResolvedValue(userFromFirebase);
  jest.spyOn(userService, 'getUserByAuthId').mockResolvedValue(null);
  jest.spyOn(userService, 'createUser').mockResolvedValue({
    id: 'a',
  } as UserDocument);

  await act(async () => {
    await result.current();
  });

  expect(userService.createUser).toHaveBeenCalledWith({
    name: userFromFirebase.displayName,
    email: userFromFirebase.email,
    authId: userFromFirebase.uid,
    authProvider: 'facebook',
  });
  expect(atomValues.user?.id).toEqual('a');
});
