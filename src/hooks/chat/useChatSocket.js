import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';

export const useChatSocket = ({ teamId, userId, nickname }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!teamId || !userId) return;

    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws';

    const client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('✅ WebSocket Connected');
      setStompClient(client);
      setIsConnected(true);

      client.subscribe(`/topic/room/${teamId}`, (message) => {
        try {
          const newMessage = JSON.parse(message.body);

          queryClient.setQueryData(['chatMessages', teamId], (prev) => {
            if (!prev || !prev.pages?.length) return prev;

            const allMessages = prev.pages.flatMap((p) => p.content);
            const exists = allMessages.some((msg) => msg.id === newMessage.id);
            if (exists) return prev;

            // 마지막 페이지가 없을 경우를 대비
            const lastPageIndex = prev.pages.length - 1;
            const lastPage = prev.pages[lastPageIndex];

            const updatedLastPage = {
              ...lastPage,
              content: [...lastPage.content, newMessage],
            };

            const updatedPages = [...prev.pages];
            updatedPages[lastPageIndex] = updatedLastPage;

            return {
              ...prev,
              pages: updatedPages,
            };
          });
        } catch (err) {
          console.error('❌ 메시지 파싱 오류:', err);
        }
      });
    };

    client.onWebSocketError = (error) => {
      console.error('❌ WebSocket Error:', error);
    };

    client.activate();

    return () => {
      console.log('🔌 WebSocket Disconnected');
      client.deactivate();
      setIsConnected(false);
    };
  }, [teamId, userId]);

  const sendMessage = (message) => {
    if (!message.trim() || !isConnected || !stompClient) {
      console.warn('❗ 메시지를 보낼 수 없습니다.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      teamId,
      userId,
      content: message,
      userInfo: { userId, nickname },
      createdAt: new Date().toISOString(),
    };

    stompClient.publish({
      destination: '/app/room',
      body: JSON.stringify(newMessage),
    });

    queryClient.setQueryData(['chatMessages', teamId], (prev) => {
      if (!prev || !prev.pages?.length) return prev;

      const lastPageIndex = prev.pages.length - 1;
      const lastPage = prev.pages[lastPageIndex];

      const updatedLastPage = {
        ...lastPage,
        content: [...lastPage.content, newMessage],
      };

      const updatedPages = [...prev.pages];
      updatedPages[lastPageIndex] = updatedLastPage;

      return {
        ...prev,
        pages: updatedPages,
      };
    });
  };

  return { sendMessage, isConnected, stompClient };
};
