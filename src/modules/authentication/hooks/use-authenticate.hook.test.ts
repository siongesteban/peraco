import { renderHook, act } from '@testing-library/react-hooks';
import { createWrapper } from 'test-utils';

import { UserDocument } from 'shared/services/rxdb/schemas';

import { useAuthenticate } from './use-authenticate.hook';

test('Sets user if successful', async () => {
  const { Wrapper, atomValues, services } = createWrapper();

  const { result } = renderHook(() => useAuthenticate(), { wrapper: Wrapper });

  const { userService } = services;

  jest
    .spyOn(userService, 'authenticate')
    .mockResolvedValue({ id: 'a' } as UserDocument);

  await act(async () => {
    await result.current();
  });

  expect(atomValues.user?.id).toEqual('a');
});

test('Sets user to null if failed', async () => {
  const { Wrapper, atomValues, services } = createWrapper();

  const { result } = renderHook(() => useAuthenticate(), { wrapper: Wrapper });

  const { userService } = services;

  jest
    .spyOn(userService, 'authenticate')
    .mockRejectedValue(new Error('Failed!'));

  await act(async () => {
    await result.current();
  });

  expect(atomValues.user).toBeNull();
});
