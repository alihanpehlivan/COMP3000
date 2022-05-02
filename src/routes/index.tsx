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

const { Dashboard } = lazyImport(
  () => import('@/features/dashboard'),
  'Dashboard'
);

export const AppRoutes = () => {
  const appRoutes = [
    {
      path: '/app',
      element: <App />,
      children: [{ path: '/', element: <Dashboard /> }, ...publicRoutes],
    },
  ];

  const authRoutes = [{ path: '/auth/*', element: <AuthRoutes /> }];

  return <>{useRoutes([...appRoutes, ...authRoutes, ...commonRoutes])}</>;
};
