import * as React from 'react';
import { useAtom } from 'jotai';

import { Typography } from '@material-ui/core';

import { LoaderIcon } from 'shared/assets';
import { loaderMessageAtom } from 'shared/atoms';
import { VerticalCenter } from 'shared/components';

export const Loader: React.FC = () => {
  const [message] = useAtom(loaderMessageAtom);

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
