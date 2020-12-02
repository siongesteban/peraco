import { useAtom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

type User = {
  name: string;
};

type AuthenticationAtom = {
  isAuthenticating?: boolean;
  message: string | null;
  user: User | null;
};

type UseAuthenticationState = () => AuthenticationAtom & {
  isAuthenticated: boolean;
};

type UseAuthenticationAction = () => {
  setAuthenticationValues: (
    newValues: Partial<AuthenticationAtom>,
  ) => void | Promise<void>;
};

export const authenticationAtom = atomWithReset<AuthenticationAtom>({
  message: null,
  user: null,
});

authenticationAtom.debugLabel = '@peraco/AUTHENTICATION';

export const useAuthenticationState: UseAuthenticationState = () => {
  const [authentication] = useAtom(authenticationAtom);

  return {
    ...authentication,
    isAuthenticated: !!authentication.user,
  };
};

export const useAuthenticationAction: UseAuthenticationAction = () => {
  const [, setAuthentication] = useAtom(authenticationAtom);

  const setAuthenticationValues = (
    newValues: Partial<AuthenticationAtom>,
  ): void | Promise<void> =>
    setAuthentication((prev) => ({ ...prev, ...newValues }));

  return { setAuthenticationValues };
};
