import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '@axios/axios';
import { Client } from '@stomp/stompjs';

export const useChat = (teamId, userId) => {
  const [stompClient, setStompClient] = useState(null);
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
  });

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('WebSocket Connected');

      client.subscribe(`/topic/room/${teamId}`, (message) => {
        try {
          const newMessage = JSON.parse(message.body);
          queryClient.setQueryData(['chatMessages', teamId], (prev) =>
            prev ? [...prev, newMessage] : [newMessage]
          );
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });

      setStompClient(client);
    };

    client.onWebSocketError = (error) => {
      console.error('WebSocket Error:', error);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [teamId, queryClient]);

  const sendMessage = (message) => {
    if (!message.trim() || !stompClient) return;

    const newMessage = { id: Date.now(), teamId, userId, content: message };

    stompClient.publish({
      destination: '/app/room',
      body: JSON.stringify(newMessage),
    });

    queryClient.setQueryData(['chatMessages', teamId], (prev) =>
      prev ? [...prev, newMessage] : [newMessage]
    );
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  return { messages, isLoading, error, sendMessage, scrollToBottom, chatContainerRef };
};
