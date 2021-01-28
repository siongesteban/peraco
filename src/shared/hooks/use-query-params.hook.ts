import { NavigateFunction } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

import { parseQueryString } from 'shared/utils';

export type QueryParams = Partial<{
  dialog: 'set-currency' | 'new-wallet' | null;
  subdialog: 'field' | null;
  field: string | null;
}>;

type SetQueryParams = (
  queryParams: QueryParams,
  options?: { replace?: boolean },
) => void;

export const useQueryParams = (): {
  queryParams: QueryParams;
  setQueryParams: SetQueryParams;
  navigate: NavigateFunction;
} => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentQueryParams = parseQueryString(location.search);

  const setQueryParams: SetQueryParams = (queryParams, options) => {
    const search = qs.stringify(
      { ...currentQueryParams, ...queryParams },
      { skipNulls: true },
    );

    navigate(
      {
        pathname: location.pathname,
        search: search ? `?${search}` : '',
      },
      options,
    );
  };

  return {
    queryParams: currentQueryParams as QueryParams,
    setQueryParams,
    navigate,
  };
};
