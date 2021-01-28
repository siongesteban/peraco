import React from 'react';
import { Outlet } from 'react-router-dom';

import { ShellContainer } from 'modules/app/shell';

export const MainPage: React.FC = () => (
  <ShellContainer>
    <Outlet />
  </ShellContainer>
);
