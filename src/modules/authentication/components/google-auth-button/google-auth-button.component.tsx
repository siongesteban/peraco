import React from 'react';

import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { useSignIn } from '../../hooks';
import { SocialAuthButton } from '../social-auth-button';
import { GoogleLogo } from './assets';

const useStyles = makeStyles({
  root: {
    background: '#fff',
    border: `1px solid ${grey[300]}`,
    '&:hover': {
      background: '#fff',
    },
  },
});

export const GoogleAuthButton: React.FC = () => {
  const { root } = useStyles();
  const signIn = useSignIn('google');

  const handleClick = (): void => {
    signIn();
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
