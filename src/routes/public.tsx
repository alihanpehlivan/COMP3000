import { lazyImport } from '@/utils/lazyImport';

const { PlacesRoutes } = lazyImport(
  () => import('@/features/places'),
  'PlacesRoutes'
);

const { ReviewRoutes } = lazyImport(
  () => import('@/features/reviews'),
  'ReviewRoutes'
);

export const publicRoutes = [
  { path: '/places/*', element: <PlacesRoutes /> },
  { path: '/reviews/*', element: <ReviewRoutes /> },
];
