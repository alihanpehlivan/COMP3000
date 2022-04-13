import { Suspense } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { LoadingFallback } from '@/features/misc';

import { commonRoutes } from './common';
import { publicRoutes } from './public';

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={LoadingFallback(false)}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  const appRoutes = [
    {
      path: '/app',
      element: <App />,
      children: [...publicRoutes],
    },
  ];

  const element = useRoutes([...appRoutes, ...commonRoutes]);
  return <>{element}</>;
};
