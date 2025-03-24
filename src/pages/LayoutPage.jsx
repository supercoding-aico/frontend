import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import '@styles/pages/layout-page.scss';
import Sidebar from '@components/layout-page/Sidebar';
import Notification from '@components/layout-page/Notification';
import { __connectWebSocket } from '@redux/slice/websocketSlice';
import { useGetNotification } from '@hooks/notification/useNotification';

const LayoutPage = () => {
  const dispatch = useDispatch();

  const { data: notifications } = useGetNotification();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { userId } = useSelector((state) => state.user.userInfo);
  const { message } = useSelector((state) => state.websocket);

  const realTimeNotification = useMemo(() => {
    return message ? [...notifications, message] : notifications;
  }, [notifications, message]);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    dispatch(__connectWebSocket(`/topic/notification/${userId}`));
  }, []);

  return (
    //TODO : 모바일 반응형 추가
    <div className='layout-page'>
      <aside className='layout-page__aside'>
        <Sidebar
          handleNotificationClick={handleNotificationClick}
          alertCount={realTimeNotification?.length ?? 0}
        />
        {isNotificationOpen && <Notification notifications={realTimeNotification} />}
      </aside>
      <main className='layout-page__main'>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPage;
