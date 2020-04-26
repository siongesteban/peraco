import merge from 'lodash/merge';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

import { baseTheme } from '../base.theme';

export const createTheme = (options: ThemeOptions) =>
  createMuiTheme(merge(baseTheme, options));
