import { Outlet, Navigate } from 'react-router-dom';

const AuthRoute = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
};

export default AuthRoute;
