import { Square, CheckSquare } from 'react-feather';
import { useEffect, useState } from 'react';
import '@styles/components/layout-page/notification.scss';
import { useReadNotification } from '@hooks/notification/useNotification';

const Notification = ({ isOpen, notifications }) => {
  const [isAllRead, setIsAllRead] = useState(false);
  const [selectedNoti, setSelectedNoti] = useState([]);

  const { mutate: readNotification } = useReadNotification();

  const handleNotiClick = (notiId) => {
    if (selectedNoti.includes(notiId)) {
      setSelectedNoti(selectedNoti.filter((id) => id !== notiId));
    } else {
      setSelectedNoti([...selectedNoti, notiId]);
    }
  };

  const handleReadNoti = () => {
    const queryString = selectedNoti.map((id) => `notification-id=${id}`).join('&');
    readNotification(queryString);
  };

  useEffect(() => {
    if (isAllRead) {
      setSelectedNoti(notifications.map((noti) => noti.notificationId));
    } else {
      setSelectedNoti([]);
    }
  }, [isAllRead]);

  return (
    <div className='notification-container'>
      <div className='read-buttons'>
        <button
          type='button'
          onClick={() => setIsAllRead(!isAllRead)}
          className='read-buttons__button'
        >
          {!isAllRead ? <Square size={16} /> : <CheckSquare size={16} />}
          모든 알림 선택
        </button>
        <button type='button' onClick={handleReadNoti} className='read-buttons__button'>
          읽음으로 표시
        </button>
      </div>
      <ul className='notification-list'>
        {notifications
          ? notifications.map((noti, i) => (
              <li
                key={i}
                className={`notification ${selectedNoti.includes(noti.notificationId) ? 'notification--selected' : ''}`}
              >
                <label className='notification__content'>
                  {noti.content}
                  <input
                    type='checkbox'
                    className='notification__checkbox'
                    onClick={() => handleNotiClick(noti.notificationId)}
                  />
                  <p className='notification__user'>{noti.registeredBy}</p>
                </label>
              </li>
            ))
          : ''}
      </ul>
    </div>
  );
};

export default Notification;
