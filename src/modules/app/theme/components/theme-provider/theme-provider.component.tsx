import React from 'react';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/300-italic.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/400-italic.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/700-italic.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/800-italic.css';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { Head } from 'shared/components';
import { useThemeMode } from 'shared/hooks';

import { DARK_THEME, LIGHT_THEME } from '../../constants';

export const ThemeProvider: React.FC = ({ children }) => {
  const themeMode = useThemeMode();

  const dark = themeMode === 'dark';

  return (
    <MuiThemeProvider theme={{ ...(dark ? DARK_THEME : LIGHT_THEME) }}>
      <Head themeColor={dark ? '#201f27' : '#ffffff'} />
      {children}
    </MuiThemeProvider>
  );
};
