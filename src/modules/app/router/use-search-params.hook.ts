import { NavigateFunction } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

export type SearchParams = Partial<{
  dialog: 'set-currency' | 'new-wallet' | null;
}>;

type SetSearchParams = (
  searchParams: SearchParams,
  options?: { replace?: boolean },
) => void;

export const useSearchParams = (): {
  searchParams: SearchParams;
  setSearchParams: SetSearchParams;
  navigate: NavigateFunction;
} => {
  const location = useLocation();
  const navigate = useNavigate();

  const setSearchParams: SetSearchParams = (searchParams, options) => {
    const search = qs.stringify(
      { ...location.state, ...searchParams },
      { skipNulls: true },
    );

    navigate(
      {
        search: search ? `?${search}` : '',
      },
      options,
    );
  };

  return {
    searchParams: qs.parse(location.search.split('?')[1]) as SearchParams,
    setSearchParams,
    navigate,
  };
};
