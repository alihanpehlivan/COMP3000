import { Suspense } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { LoadingFallback } from '@/features/misc';
import { lazyImport } from '@/utils/lazyImport';

import { commonRoutes } from './common';
import { publicRoutes } from './public';

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

const { AuthRoutes } = lazyImport(
  () => import('@/features/auth'),
  'AuthRoutes'
);

export const AppRoutes = () => {
  const appRoutes = [
    {
      path: '/app',
      element: <App />,
      children: [...publicRoutes],
    },
  ];

  const authRoutes = [{ path: '/auth/*', element: <AuthRoutes /> }];

  return <>{useRoutes([...appRoutes, ...authRoutes, ...commonRoutes])}</>;
};
