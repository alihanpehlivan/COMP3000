import { Navigate, Route, Routes } from 'react-router-dom';

import { Place } from './Place';
import { Places } from './Places';

export const PlacesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Places />} />
      <Route path=":placesId" element={<Place />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
