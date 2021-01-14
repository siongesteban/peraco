import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from 'modules/app/layout';
import { AccountPage } from 'modules/account';
import { WalletsPage } from 'modules/wallets';

export const MainPage: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<WalletsPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  </Layout>
);
