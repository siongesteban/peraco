import { useNavigate } from 'react-router-dom';

import { FirebaseService } from 'shared/services/firebase';
import { useAppErrorAction } from 'modules/app/states';

import { useAuthenticationAction } from '../states';

export const useSignOut = (): (() => Promise<void>) => {
  const { setAppError } = useAppErrorAction();
  const { setAuthenticationValues } = useAuthenticationAction();

  const navigate = useNavigate();

  const firebaseService = FirebaseService.getInstance();

  const signOut = async (): Promise<void> => {
    try {
      await firebaseService.signOut();

      setAuthenticationValues({
        user: null,
      });

      navigate('/welcome');
    } catch (e) {
      setAppError({ message: e.message, error: e });
    }
  };

  return signOut;
};
