import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '@axios/axios';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useChat = () => {
  const { teamId } = useParams();
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const nickname = useSelector((state) => state.user.userInfo?.nickname);

  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();
  const chatContainerRef = useRef(null);

  const {
    data: messages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chatMessages', teamId],
    queryFn: async () => {
      const res = await axios.get(`/api/chat/${teamId}?page=0`);
      return res.data?.data?.content || [];
    },
    staleTime: 10000,
    enabled: !!teamId,
  });

  console.log(messages);

  useEffect(() => {
    if (!teamId || !userId) return;

    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws';

    const client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('WebSocket Connected');
      setStompClient(client);
      setIsConnected(true);

      client.subscribe(`/topic/room/${teamId}`, (message) => {
        try {
          const newMessage = JSON.parse(message.body);
          queryClient.setQueryData(['chatMessages', teamId], (prev) => {
            const exists = prev?.some((msg) => msg.id === newMessage.id);
            return exists ? prev : [...(prev || []), newMessage];
          });
        } catch (error) {
          console.error('❌ 메시지 파싱 오류:', error);
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
  }, [teamId, userId, queryClient]);

  const sendMessage = (message) => {
    if (!message.trim() || !isConnected || !stompClient) {
      console.warn('❗ 메시지를 보낼 수 없습니다. 연결 상태 확인 필요');
      return;
    }

    const newMessage = {
      id: Date.now(),
      teamId,
      userId,
      content: message,
      userInfo: { nickname },
    };

    stompClient.publish({
      destination: '/app/room',
      body: JSON.stringify(newMessage),
    });

    queryClient.setQueryData(['chatMessages', teamId], (prev) => {
      const exists = prev?.some((msg) => msg.id === newMessage.id);
      return exists ? prev : [...(prev || []), newMessage];
    });
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    scrollToBottom,
    chatContainerRef,
    isConnected,
  };
};
