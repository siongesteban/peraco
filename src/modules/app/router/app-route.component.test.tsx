import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { render, screen } from 'test-utils';

import { AppRoute } from './app-route.component';

const Wrapper: React.FC = ({ children }) => (
  <Routes>
    <Route path="/" element={<div>home</div>} />
    <Route path="welcome" element={<div>welcome</div>} />
    {children}
  </Routes>
);

const TestPage: React.FC = () => <p>test page</p>;

test('Displays page loader with the correct message when signing in', () => {
  render(
    <Wrapper>
      <AppRoute path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'signingIn',
        loaderMessage: 'Signing in...',
      },
      memoryRouter: {
        initialEntries: ['/page'],
      },
    },
  );

  expect(screen.getByText(/Signing in.../)).toBeInTheDocument();
  expect(screen.queryByText(/test page/)).not.toBeInTheDocument();
});

test('Displays splash screen when authenticating', () => {
  render(
    <Wrapper>
      <AppRoute path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'authenticating',
      },
      memoryRouter: {
        initialEntries: ['/page'],
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
    <Wrapper>
      <AppRoute isPrivate path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'unauthenticated',
      },
      memoryRouter: {
        initialEntries: ['/page'],
      },
    },
  );

  expect(screen.queryByText(/welcome/)).toBeInTheDocument();
  expect(screen.queryByText(/test page/)).not.toBeInTheDocument();
});

test('Redirects to index page if the route is for guests only and the user is authenticated', () => {
  render(
    <Wrapper>
      <AppRoute isGuestOnly path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'authenticated',
      },
      memoryRouter: {
        initialEntries: ['/page'],
      },
    },
  );

  expect(screen.queryByText(/home/)).toBeInTheDocument();
  expect(screen.queryByText(/test page/)).not.toBeInTheDocument();
});

test('Shows page when it is private and the user is authenticated', () => {
  render(
    <Wrapper>
      <AppRoute isPrivate path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'authenticated',
      },
      memoryRouter: {
        initialEntries: ['/page'],
      },
    },
  );

  expect(screen.getByText(/test page/)).toBeInTheDocument();
});

test('Shows page when it is for guests only and the user is unauthenticated', () => {
  render(
    <Wrapper>
      <AppRoute isGuestOnly path="/page" element={<TestPage />} />
    </Wrapper>,
    {
      initialState: {
        authenticationStatus: 'unauthenticated',
      },
      memoryRouter: {
        initialEntries: ['/page'],
      },
    },
  );

  expect(screen.getByText(/test page/)).toBeInTheDocument();
});
