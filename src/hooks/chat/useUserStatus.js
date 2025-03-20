import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useUserStatus = (teamId, userId, stompClient) => {
  const [isActive, setIsActive] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!stompClient || !stompClient.connected) return;

    const subscription = stompClient.subscribe(`/topic/user-status/${teamId}`, (message) => {
      try {
        const data = JSON.parse(message.body);
        if (data.userId === userId) {
          setIsActive(data.status === 'active');
        }
      } catch (error) {
        console.error('Error parsing user status message:', error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, teamId, userId]);

  return { isActive };
};

export default useUserStatus;
