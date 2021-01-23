import { NavigateFunction } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

export type SearchParams = Partial<{
  dialog: 'set-currency' | 'new-wallet' | null;
  subdialog: 'field' | null;
  field: string | null;
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

  const currentSearchParams = parseSearchString(location.search);

  const setSearchParams: SetSearchParams = (searchParams, options) => {
    const search = qs.stringify(
      { ...currentSearchParams, ...searchParams },
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
    searchParams: currentSearchParams as SearchParams,
    setSearchParams,
    navigate,
  };
};

const parseSearchString = (searchString: string): qs.ParsedQs =>
  qs.parse(searchString.split('?')[1]);
