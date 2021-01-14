import * as React from 'react';

import { PageContent } from 'shared/components';

import { Header } from 'modules/app/layout';

type MainPageContainer = React.FC & {
  Header: typeof Header;
  Content: typeof PageContent;
};

export const MainPageContainer: MainPageContainer = ({ children }) => (
  <>{children}</>
);

MainPageContainer.Header = Header;
MainPageContainer.Content = PageContent;
