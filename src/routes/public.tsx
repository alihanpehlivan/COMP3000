import { lazyImport } from '@/utils/lazyImport';

const { PlacesRoutes } = lazyImport(
  () => import('@/features/places'),
  'PlacesRoutes'
);

export const publicRoutes = [{ path: '/places/*', element: <PlacesRoutes /> }];
