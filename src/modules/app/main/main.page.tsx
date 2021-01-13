import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AccountPage } from 'modules/account';
import { WalletsPage } from 'modules/wallets';

import { Layout } from './layout.component';

export const MainPage: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<WalletsPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  </Layout>
);
