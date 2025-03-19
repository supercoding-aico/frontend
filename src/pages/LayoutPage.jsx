import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import '@styles/pages/layout-page.scss';
import Sidebar from '@components/layout-page/Sidebar';
import { connectSocket, disconnectSocket, removeListener } from '@services/socketService';

const LayoutPage = () => {
  const userId = useSelector((state) => state.user.userInfo.userId);

  useEffect(() => {
    if (!userId) return;

    const url = `${process.env.REACT_APP_SOCKET_URL}/topic/notification/${userId}`;
    connectSocket(url);

    return () => {
      disconnectSocket();
      removeListener();
    };
  }, [userId]);

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
