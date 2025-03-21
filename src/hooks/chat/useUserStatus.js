import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

export const useUserStatus = () => {
  const { teamId } = useParams();
  const [activeUsers, setActiveUsers] = useState(new Set());

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('WebSocket Connected');

      // ✅ 유저가 채팅방에 들어왔을 때 (Active 상태)
      client.subscribe(`/app/room/active`, (message) => {
        try {
          const activeUser = JSON.parse(message.body);
          console.log('🟢 User Active:', activeUser);

          setActiveUsers((prev) => {
            const updatedUsers = new Set(prev);
            updatedUsers.add(activeUser.userId);
            return updatedUsers;
          });
        } catch (error) {
          console.error('Error parsing active user message:', error);
        }
      });

      // ✅ 유저가 채팅방에서 나갔을 때 (Inactive 상태)
      client.subscribe(`/app/room/inactive`, (message) => {
        try {
          const inactiveUser = JSON.parse(message.body);
          console.log('⚪ User Inactive:', inactiveUser);

          setActiveUsers((prev) => {
            const updatedUsers = new Set(prev);
            updatedUsers.delete(inactiveUser.userId);
            return updatedUsers;
          });

          // ⏳ 10초 후 자동으로 리스트에서 제거 (예외 처리)
          setTimeout(() => {
            setActiveUsers((prev) => {
              const updatedUsers = new Set(prev);
              updatedUsers.delete(inactiveUser.userId);
              return updatedUsers;
            });
          }, 10000);
        } catch (error) {
          console.error('Error parsing inactive user message:', error);
        }
      });
    };

    client.activate();

    return () => client.deactivate();
  }, [teamId]);

  return { activeUsers };
};
