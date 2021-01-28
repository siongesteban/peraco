import deepmerge from 'deepmerge';

import { createMuiTheme, ThemeOptions, Theme } from '@material-ui/core/styles';

import { BASE_THEME } from '../constants';

export const createTheme = (options: ThemeOptions): Theme =>
  createMuiTheme(deepmerge(BASE_THEME, options));
