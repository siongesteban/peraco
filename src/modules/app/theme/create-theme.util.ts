import { merge } from 'lodash';

import { createMuiTheme, ThemeOptions, Theme } from '@material-ui/core/styles';

import { BASE_THEME } from './constants';

export const createTheme = (options: ThemeOptions): Theme =>
  createMuiTheme(merge(BASE_THEME, options));
