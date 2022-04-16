import { Landing, NotFound } from '@/features/misc';

export const commonRoutes = [
  { path: '/', element: <Landing /> },
  { path: '*', element: <NotFound /> },
];
