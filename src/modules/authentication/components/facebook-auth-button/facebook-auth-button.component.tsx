import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useSignIn } from '../../hooks';
import { SocialAuthButton } from '../social-auth-button';
import { FacebookLogo } from './assets';

const useStyles = makeStyles({
  root: {
    background: '#0b55b7',
    color: '#fff',
    '&:hover': {
      background: '#0b55b7',
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
