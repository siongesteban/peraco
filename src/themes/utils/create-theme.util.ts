import { merge } from 'lodash';
import { createMuiTheme, ThemeOptions } from '@material-ui/core';

import { baseTheme } from '../base.theme';

export const createTheme = (options: ThemeOptions) =>
  createMuiTheme(merge(baseTheme, options));
