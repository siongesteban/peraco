import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseService } from 'shared/services/firebase';
import { AppContext } from 'modules/app/contexts';

import { UserContext } from '../contexts';

export const useSignOut = (): (() => Promise<void>) => {
  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const firebaseService = FirebaseService.getInstance();

  const signOut = async (): Promise<void> => {
    try {
      await firebaseService.signOut();

      userContext.setValues({
        user: null,
        isAuthenticated: false,
      });

      navigate('/welcome');
    } catch (e) {
      appContext.enqueueErrorMessage(e.message);
    }
  };

  return signOut;
};
