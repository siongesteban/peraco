import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export type HeadProps = Partial<{
  title: string;
  themeColor: string;
}>;

export const Head: React.FC<HeadProps> = ({ title, themeColor }) => (
  <Helmet>
    {!title ? null : <title>{title} – Peraco</title>}
    {!themeColor ? null : <meta name="theme-color" content={themeColor} />}
  </Helmet>
);
