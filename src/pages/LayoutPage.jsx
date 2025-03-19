import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import '@styles/pages/layout-page.scss';
import Sidebar from '@components/layout-page/Sidebar';
import { connectSocket, disconnectSocket, removeListener } from '@services/socketService';

const LayoutPage = () => {
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!user || !user.userId) {
      return;
    }

    const url = process.env.REACT_APP_SOCKET_URL;
    const userId = user.userId;
    connectSocket(url, userId);

    return () => {
      disconnectSocket();
      removeListener();
    };
  }, []);

  // TODO: 모바일 반응형 추가
  return (
    <div className='layout-page'>
      <aside className='layout-page__aside'>
        <Sidebar />
      </aside>
      <main className='layout-page__main'>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPage;
