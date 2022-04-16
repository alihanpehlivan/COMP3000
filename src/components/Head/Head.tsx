import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | CriticEats` : undefined}
      defaultTitle="CriticEats"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
