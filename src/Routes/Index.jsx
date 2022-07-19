import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthGoogleContext } from '../Contexts/AuthGoogle';

export const PrivateRoutes = () => {
  const { signed } = useContext(AuthGoogleContext);
  console.log(signed);
  return signed ? <Outlet /> : <Navigate to="/" />;
};
