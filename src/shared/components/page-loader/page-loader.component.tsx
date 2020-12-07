import * as React from 'react';

import { Typography } from '@material-ui/core';

import { LoaderIcon } from 'shared/assets';
import { VerticalCenter } from 'shared/components';

export type PageLoaderProps = Readonly<{
  message?: string | null;
}>;

export const PageLoader: React.FC<PageLoaderProps> = ({ message }) => (
  <VerticalCenter>
    <VerticalCenter.Item>
      <LoaderIcon height={72} />
      <Typography align="center" variant="subtitle2">
        {message || 'Just a moment...'}
      </Typography>
    </VerticalCenter.Item>
  </VerticalCenter>
);
