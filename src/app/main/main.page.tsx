import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { WalletsPage } from 'app/wallets';

import { Layout } from './layout.component';

export const MainPage: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<WalletsPage />} />
    </Routes>
  </Layout>
);
