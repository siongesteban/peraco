import qs from 'qs';

export const parseSearchString = (searchString: string): qs.ParsedQs =>
  qs.parse(searchString.split('?')[1]);
