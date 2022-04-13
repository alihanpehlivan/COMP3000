import { useRoutes } from 'react-router-dom';

import { Landing, NotFound } from '@/features/misc';

export const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '*', element: <NotFound /> },
  ];
  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
