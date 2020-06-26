import { merge } from 'lodash';
import { createMuiTheme, ThemeOptions } from '@material-ui/core';

import { BASE_THEME } from '../constants';

export const createTheme = (options: ThemeOptions) =>
  createMuiTheme(merge(BASE_THEME, options));
