import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { SettingsProvider } from 'modules/app/settings';
import { AccountPage } from 'modules/account';
import { WalletsPage } from 'modules/wallets';

import { Layout } from './layout.component';

export const MainPage: React.FC = () => (
  <Layout>
    <SettingsProvider>
      <Routes>
        <Route path="/" element={<WalletsPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </SettingsProvider>
  </Layout>
);
