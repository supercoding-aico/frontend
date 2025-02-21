import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PrivateRoute from '@/router/PrivateRoute'; // TODO: 로그인 기능 구현 이후 추가
// pages
import LayoutPage from '@pages/LayoutPage';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';
import AuthPage from '@pages/AuthPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/signup' element={<AuthPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route element={<LayoutPage />}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
