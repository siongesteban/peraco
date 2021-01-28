import React from 'react';

import { PageContent } from 'shared/components';

import { Header } from '../header';

type Shell = React.FC & {
  Header: typeof Header;
  Content: typeof PageContent;
};

export const Shell: Shell = ({ children }) => <>{children}</>;

Shell.Header = Header;
Shell.Content = PageContent;
