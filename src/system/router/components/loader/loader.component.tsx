import React from 'react';
import { useAtomValue } from 'jotai/utils';

import { Typography } from '@material-ui/core';

import { LoaderIcon } from 'shared/assets';
import { loaderMessageAtom } from 'shared/atoms';
import { VerticalCenter } from 'shared/components';

export const Loader: React.FC = () => {
  const message = useAtomValue(loaderMessageAtom);

  return (
    <VerticalCenter>
      <VerticalCenter.Item>
        <LoaderIcon height={72} />
        <Typography align="center" variant="subtitle2">
          {message || 'Just a moment...'}
        </Typography>
      </VerticalCenter.Item>
    </VerticalCenter>
  );
};
