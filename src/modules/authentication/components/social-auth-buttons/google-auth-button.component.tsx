import React from 'react';

import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { FirebaseService } from 'shared/services/firebase/firebase.service';

import { ReactComponent as GoogleLogo } from '../../assets/icons/google-logo.icon.svg';
import { UserContext } from '../../contexts';
import { SocialAuthButton } from './social-auth-button.component';

export const useStyles = makeStyles({
  root: {
    background: '#fff',
    border: `1px solid ${grey[300]}`,
  },
});

export const GoogleAuthButton: React.FC = () => {
  const { root } = useStyles();
  const userContext = React.useContext(UserContext);
  const firebaseService = FirebaseService.getInstance();

  const handleClick = async (): Promise<void> => {
    userContext.setValues?.({ authenticating: true });

    const user = await firebaseService.signInWithGoogle();

    if (!user) {
      return userContext.setValues?.({ authenticating: false });
    }

    userContext.setValues?.({
      authenticating: false,
      user: { name: user.uid },
    });
  };

  return (
    <SocialAuthButton
      className={root}
      icon={GoogleLogo}
      name="Google"
      onClick={handleClick}
    />
  );
};
