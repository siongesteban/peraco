import React from 'react';
import { Outlet } from 'react-router-dom';

import { ShellContainer } from 'system/shell';

export const MainPage: React.FC = () => (
  <ShellContainer>
    <Outlet />
  </ShellContainer>
);
