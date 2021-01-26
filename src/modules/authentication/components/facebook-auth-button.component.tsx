import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { FacebookLogo } from '../assets';
import { useSignIn } from '../hooks';
import { SocialAuthButton } from './social-auth-button.component';

const useStyles = makeStyles({
  root: {
    background: '#1877f2',
    color: '#fff',
    '&:hover': {
      background: '#1877f2',
    },
  },
});

export const FacebookAuthButton: React.FC = () => {
  const { root } = useStyles();
  const signIn = useSignIn('facebook');

  const handleClick = (): void => {
    signIn();
  };

  return (
    <SocialAuthButton
      className={root}
      icon={FacebookLogo}
      name="Facebook"
      onClick={handleClick}
    />
  );
};
