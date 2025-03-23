import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import '@styles/pages/layout-page.scss';
import Sidebar from '@components/layout-page/Sidebar';
import Notification from '@components/layout-page/Notification';
import { useGetNoitification } from '@hooks/notification/useNotification';

const LayoutPage = () => {
  const dispatch = useDispatch();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { data: notifications } = useGetNoitification();

  // const userId = useSelector((state) => state.user.userInfo.userId);
  // const messages = useSelector((state) => state.websocket.messages);
  // const subscribedTopics = useSelector((state) => state.websocket.subscribedTopics);

  // const topic = `topic/notification/${userId}`;

  // console.log('messages', messages);
  // console.log('subscribedTopics', subscribedTopics);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    //TODO : 모바일 반응형 추가
    <div className='layout-page'>
      <aside className='layout-page__aside'>
        <Sidebar handleNotificationClick={handleNotificationClick} />
        {isNotificationOpen && <Notification notifications={notifications} />}
      </aside>
      <main className='layout-page__main'>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPage;
