import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useVerticalCenterStyles = makeStyles(() =>
  createStyles({
    fullHeight: {
      minHeight: '100%',
    },
  }),
);
