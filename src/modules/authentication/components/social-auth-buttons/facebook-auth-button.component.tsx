import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as FacebookLogo } from '../../assets/icons/facebook-logo.icon.svg';
import { SocialAuthButton } from './social-auth-button.component';

const useStyles = makeStyles({
  root: {
    background: '#1877f2',
    color: '#fff',
    '&:hover': {
      background: '#1050a2',
    },
  },
});

export const FacebookAuthButton: React.FC = () => {
  const { root } = useStyles();

  return (
    <SocialAuthButton className={root} icon={FacebookLogo} name="Facebook" />
  );
};
