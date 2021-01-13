import * as React from 'react';

import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { useSignIn } from '../hooks';
import { GoogleLogo } from '../assets';
import { SocialAuthButton } from './social-auth-button.component';

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
