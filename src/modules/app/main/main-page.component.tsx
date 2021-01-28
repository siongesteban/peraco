import React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'modules/app/layout';

export const MainPage: React.FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);
