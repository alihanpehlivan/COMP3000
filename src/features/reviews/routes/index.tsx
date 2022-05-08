import { Navigate, Route, Routes } from 'react-router-dom';

import { ReviewDetail } from './ReviewDetail';

export const ReviewRoutes = () => {
  return (
    <Routes>
      <Route path=":reviewId" element={<ReviewDetail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
