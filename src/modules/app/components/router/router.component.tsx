import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SigninPage } from 'modules/authentication/pages';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SigninPage />} />
    </Routes>
  </BrowserRouter>
);
