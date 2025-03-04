import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from '@router/AuthRoute';
import PrivateRoute from '@router/PrivateRoute';
// pages
import LayoutPage from '@pages/LayoutPage';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';
import AuthPage from '@pages/AuthPage';
import TeamPage from '@pages/TeamPage';
import TeamDetailPage from '@pages/TeamDetailPage';

const Router = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/login' element={<AuthPage />} />
          <Route path='/signup' element={<AuthPage />} />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<LayoutPage />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/team' element={<TeamPage />} />
            <Route path='/team/detail/:teamId' element={<TeamDetailPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
