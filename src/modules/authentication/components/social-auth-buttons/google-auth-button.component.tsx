import React from 'react';

import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as GoogleLogo } from '../../assets/icons/google-logo.icon.svg';
import { useGoogleAuth } from '../../hooks';
import { SocialAuthButton } from './social-auth-button.component';

const useStyles = makeStyles({
  root: {
    background: '#fff',
    border: `1px solid ${grey[300]}`,
  },
});

export const GoogleAuthButton: React.FC = () => {
  const { root } = useStyles();
  const { signInWithGoogle } = useGoogleAuth();

  const handleClick = (): void => {
    signInWithGoogle();
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
