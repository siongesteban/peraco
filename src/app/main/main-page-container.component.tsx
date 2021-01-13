import * as React from 'react';

import { Header } from './header.component';

const Content: React.FC = ({ children }) => <div>{children}</div>;

type MainPageContainer = React.FC & {
  Header: typeof Header;
  Content: typeof Content;
};

export const MainPageContainer: MainPageContainer = ({ children }) => (
  <>{children}</>
);

MainPageContainer.Header = Header;
MainPageContainer.Content = Content;
