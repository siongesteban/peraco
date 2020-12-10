import 'reflect-metadata';
import * as React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import {
  AuthenticationProvider,
  AuthenticationProviderProps,
} from 'modules/authentication/components';

type CustomRenderOptions = {
  authentication?: AuthenticationProviderProps;
} & RenderOptions;

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  const { authentication, ...restOptions } = options || {};

  const Wrapper: React.FC = ({ children }) => (
    <AuthenticationProvider {...authentication}>
      {children}
    </AuthenticationProvider>
  );

  return render(ui, { ...restOptions, wrapper: Wrapper });
};

export * from '@testing-library/react';

export { customRender as render };
