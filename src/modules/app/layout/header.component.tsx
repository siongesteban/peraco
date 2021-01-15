import * as React from 'react';

import {
  AppBar,
  AppBarProps,
  Container,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LogoIcon } from 'shared/assets';

type OnScrollProps = {
  children: React.ReactElement;
};

const ElevateOnScroll = React.forwardRef(function ElevateOnScroll(
  props: OnScrollProps,
  ref: React.Ref<unknown>,
) {
  const [container, setContainer] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setContainer(document.querySelector('#page-container'));
  }, []);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: container || undefined,
  });

  return React.cloneElement<AppBarProps>(props.children, {
    ref,
    elevation: trigger ? 1 : 0,
  });
});

const HideOnScroll: React.FC<OnScrollProps> = ({ children }) => {
  const [container, setContainer] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setContainer(document.querySelector('#page-container'));
  }, []);

  const trigger = useScrollTrigger({
    target: container || undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(2),
  },
}));

export type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <>
      <HideOnScroll>
        <ElevateOnScroll>
          <AppBar color="inherit">
            <Container>
              <Toolbar disableGutters>
                <LogoIcon className={classes.logo} width={32} height={32} />
                <Typography variant="h6" component="h1">
                  {title}
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        </ElevateOnScroll>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};
