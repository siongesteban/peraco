import qs from 'qs';

export const parseQueryString = (queryString: string): qs.ParsedQs =>
  qs.parse(queryString.split('?')[1]);
