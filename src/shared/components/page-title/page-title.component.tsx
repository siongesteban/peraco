import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export type PageTitleProps = {
  title: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Helmet>
    <title>{title} – Peraco</title>
  </Helmet>
);
