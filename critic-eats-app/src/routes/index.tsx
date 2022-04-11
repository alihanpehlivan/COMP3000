import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];
  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
