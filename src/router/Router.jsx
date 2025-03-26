import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCurrentUser } from '@hooks/user/useAuth';
import { setUser } from '@redux/slice/userSlice';
// routes
import AuthRoute from '@router/AuthRoute';
import PrivateRoute from '@router/PrivateRoute';
// pages
import LayoutPage from '@pages/LayoutPage';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';
import AuthPage from '@pages/AuthPage';
import TeamPage from '@pages/TeamPage';
import TeamDetailPage from '@pages/TeamDetailPage';
import CalendarPage from '@pages/CalendarPage';
import ProjectPage from '@pages/ProjectPage';
import SettingPage from '@pages/SettingPage';
import ChatPage from '@pages/ChatPage';
// components
import LoadingFullScreen from '@components/common/LoadingFullScreen';

const Router = () => {
  const dispatch = useDispatch();

  const { data: user, isLoading } = useCurrentUser();
  const [showLoading, setShowLoading] = useState(true);

  let isAuthenticated = !!user;

  if (isAuthenticated) {
    dispatch(setUser(user));
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLoading) return <LoadingFullScreen />;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* 비회원 라우트 */}
        <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/login' element={<AuthPage />} />
          <Route path='/signup' element={<AuthPage />} />
        </Route>

        {/* 회원 라우트 */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<LayoutPage />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/team' element={<TeamPage />} />
            <Route path='/team/detail/:teamId' element={<TeamDetailPage />} />
            <Route path='/team/:teamId/calendar' element={<CalendarPage />} />
            <Route path='/team/:teamId/project' element={<ProjectPage />} />
            <Route path='/team/:teamId/setting' element={<SettingPage />} />
            <Route path='/team/:teamId/chat' element={<ChatPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
