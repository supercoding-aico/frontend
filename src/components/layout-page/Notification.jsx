import { Square, CheckSquare } from 'react-feather';
import { useEffect, useState } from 'react';
import '@styles/components/layout-page/notification.scss';

const Notification = ({ notifications = [] }) => {
  const [isAllRead, setIsAllRead] = useState(false);
  const [selectedNoti, setSelectedNoti] = useState([]);

  // TODO: API 수정되면 제거
  for (let i = 0; i < notifications.length; i++) {
    notifications[i].content = notifications[i].content.replace(
      '새로운 스케줄이 등록되었습니다: ',
      ''
    );
  }

  const handleNotiClick = (notiId) => {
    if (selectedNoti.includes(notiId)) {
      setSelectedNoti(selectedNoti.filter((id) => id !== notiId));
    } else {
      setSelectedNoti([...selectedNoti, notiId]);
    }
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
        <button type='button' className='read-buttons__button'>
          읽음으로 표시
        </button>
      </div>
      <ul className='notification-list'>
        {notifications.map((noti) => (
          <li
            key={noti.notificationId}
            className={`notification ${selectedNoti.includes(noti.notificationId) ? 'notification--selected' : ''}`}
          >
            <label className='notification__content'>
              {noti.content}
              <input
                type='checkbox'
                className='notification__checkbox'
                onClick={() => handleNotiClick(noti.notificationId)}
              />
              <p className='notification__user'>유저닉네임{noti.notificationId}</p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
