import { Route, Routes } from 'react-router-dom';

import { ErrorFallback } from '@/features/misc';

import { Login } from './Login';
import { Register } from './Register';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<ErrorFallback />} />
    </Routes>
  );
};
