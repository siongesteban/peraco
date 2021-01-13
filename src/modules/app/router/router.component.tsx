import * as React from 'react';
import { BrowserRouter, Navigate, Routes } from 'react-router-dom';

import { SigninPage, useAuthenticate } from 'modules/authentication';
import { MainPage } from 'modules/app/main';

import { AppRoute } from './app-route.component';

export const Router: React.FC = () => {
  useAuthenticate();

  return (
    <BrowserRouter>
      <Routes>
        <AppRoute isGuestOnly path="welcome" element={<SigninPage />} />
        <AppRoute isPrivate path="/*" element={<MainPage />} />
        <AppRoute path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
