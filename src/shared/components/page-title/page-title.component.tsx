import React from 'react';
import { Helmet } from 'react-helmet';

export type PageTitleProps = {
  title: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Helmet>
    <title>{title} – Peraco</title>
  </Helmet>
);
