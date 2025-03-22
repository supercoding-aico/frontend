import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import '@styles/pages/layout-page.scss';
import Sidebar from '@components/layout-page/Sidebar';

const LayoutPage = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userInfo.userId);
  const messages = useSelector((state) => state.websocket.messages);
  const subscribedTopics = useSelector((state) => state.websocket.subscribedTopics);

  const topic = `topic/notification/${userId}`;

  console.log('messages', messages);
  console.log('subscribedTopics', subscribedTopics);

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
