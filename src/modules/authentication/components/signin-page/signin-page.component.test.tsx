import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getDocumentTitle,
} from 'test-utils';

import { useSignIn } from '../../hooks/use-sign-in.hook';
import { SigninPage } from './signin-page.component';

jest.mock('../../hooks/use-sign-in.hook');

const mockedUseSignin = useSignIn as jest.MockedFunction<typeof useSignIn>;

test('Displays content correctly', async () => {
  render(<SigninPage />);

  await waitFor(() => {
    expect(getDocumentTitle()).toEqual('Welcome');
  });

  expect(screen.getByText(/welcome to peraco!/i));
  expect(
    screen.getByText(/choose between the two options below to continue./i),
  );
  expect(
    screen.getByRole('button', { name: /continue with google/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /continue with facebook/i }),
  ).toBeInTheDocument();
});

test('Executes the right callback when either signin button is clicked', () => {
  const signIn = jest.fn();

  mockedUseSignin.mockReturnValue(signIn);

  render(<SigninPage />);

  fireEvent.click(
    screen.getByRole('button', { name: /continue with google/i }),
  );

  expect(signIn).toHaveBeenCalledTimes(1);

  signIn.mockReset();

  fireEvent.click(
    screen.getByRole('button', { name: /continue with facebook/i }),
  );

  expect(signIn).toHaveBeenCalledTimes(1);
});
