import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SigninPage, useAuthenticate } from 'modules/authentication';
import { MainPage } from 'modules/app/main';
import { AccountPage } from 'modules/account';
import { WalletsPage } from 'modules/wallets';

import { AppRoute } from './app-route.component';

export const Router: React.FC = () => {
  useAuthenticate();

  return (
    <BrowserRouter>
      <Routes>
        <AppRoute isGuestOnly path="welcome" element={<SigninPage />} />
        <AppRoute isPrivate path="/" element={<MainPage />}>
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="account" element={<AccountPage />} />
        </AppRoute>
      </Routes>
    </BrowserRouter>
  );
};
