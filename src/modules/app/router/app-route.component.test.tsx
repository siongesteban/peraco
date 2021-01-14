import * as React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from 'test-utils';

import { AppRoute } from './app-route.component';

type WrapperProps = {
  path?: string;
};

const Wrapper: React.FC<WrapperProps> = ({ children, path = '/' }) => (
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="/" element={<div>home</div>} />
      <Route path="welcome" element={<div>welcome</div>} />
      {children}
    </Routes>
  </MemoryRouter>
);

const TestPage: React.FC = () => <p>test page</p>;

test('Displays page loader with the correct message when signing in', () => {
  render(
    <Wrapper path="/page">
      <AppRoute path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'signingIn',
        loaderMessage: 'Signing in...',
      },
    },
  );

  expect(screen.getByText(/Signing in.../)).toBeInTheDocument();
  expect(screen.queryByText(/test page/)).not.toBeInTheDocument();
});

test('Displays splash screen when authenticating', () => {
  render(
    <Wrapper path="/page">
      <AppRoute path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'authenticating',
      },
    },
  );

  expect(
    screen.getByRole('img', { name: /splash-screen-logo/ }),
  ).toBeInTheDocument();
  expect(screen.queryByText(/test page/)).not.toBeInTheDocument();
});

test('Redirects to /welcome page if the route is private and the user is unauthenticated', () => {
  render(
    <Wrapper path="/page">
      <AppRoute isPrivate path="/page" element={<TestPage />} />
    </Wrapper>,
  );

  expect(screen.queryByText(/welcome/)).toBeInTheDocument();
  expect(screen.queryByText(/test page/)).not.toBeInTheDocument();
});

test('Redirects to index page if the route is for guests only and the user is authenticated', () => {
  render(
    <Wrapper path="/page">
      <AppRoute isGuestOnly path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'authenticated',
      },
    },
  );

  expect(screen.queryByText(/home/)).toBeInTheDocument();
  expect(screen.queryByText(/test page/)).not.toBeInTheDocument();
});

test('Shows page when it is private and the user is authenticated', () => {
  render(
    <Wrapper path="/page">
      <AppRoute isPrivate path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'authenticated',
      },
    },
  );

  expect(screen.getByText(/test page/)).toBeInTheDocument();
});

test('Shows page when it is for guests only and the user is unauthenticated', () => {
  render(
    <Wrapper path="/page">
      <AppRoute isGuestOnly path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'unauthenticated',
      },
    },
  );

  expect(screen.getByText(/test page/)).toBeInTheDocument();
});
