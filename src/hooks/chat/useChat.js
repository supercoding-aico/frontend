import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '@axios/axios';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useChat = () => {
  const { teamId: paramTeamId } = useParams();
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const teamId = paramTeamId ? Number(paramTeamId) : undefined;

  const [stompClient, setStompClient] = useState(null);
  const queryClient = useQueryClient();
  const chatContainerRef = useRef(null);
  const [userActivity, setUserActivity] = useState({});

  // ✅ 팀 ID 또는 유저 ID가 없으면 실행하지 않음
  if (!teamId || !userId) {
    console.warn('⚠️ useChat: teamId 또는 userId가 없습니다.', { teamId, userId });
    return {
      messages: [],
      isLoading: false,
      error: 'Invalid teamId or userId',
      sendMessage: () => {},
      scrollToBottom: () => {},
      chatContainerRef,
      isActive: false,
    };
  }

  useEffect(() => {
    console.log('🔄 userActivity 상태 변경:', userActivity);
  }, [userActivity]);

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

  useEffect(() => {
    if (!teamId || !userId) return;

    // ✅ WebSocket이 이미 연결되어 있다면 다시 연결하지 않음
    if (stompClient) {
      console.warn('⚠️ WebSocket already connected, skipping new connection.');
      return;
    }

    const wsUrl = process.env.REACT_APP_WS_URL;
    if (!wsUrl) {
      console.error('❌ WebSocket URL이 설정되지 않았습니다. REACT_APP_WS_URL 확인 필요');
      return;
    }

    const client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('✅ WebSocket Connected');

      // ✅ 서버에 현재 유저의 활성 상태 알리기
      client.publish({
        destination: '/app/room/active',
        body: JSON.stringify({ teamId, userId }),
      });

      // ✅ 채팅 메시지 구독
      client.subscribe(`/topic/room/${teamId}`, (message) => {
        try {
          const newMessage = JSON.parse(message.body);
          queryClient.setQueryData(['chatMessages', teamId], (prev) =>
            prev ? [...prev, newMessage] : [newMessage]
          );
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      });

      // ✅ 유저 활성 상태 확인 (채팅방 입장)
      client.subscribe(`/app/room/active`, (message) => {
        console.log('📩 Received Active Message:', message.body);

        try {
          const activeUser = JSON.parse(message.body);
          console.log('🟢 Parsed Active User:', activeUser);

          setUserActivity((prev) => {
            const updatedActivity = {
              ...prev,
              [activeUser.userId]: { status: 'active', time: new Date() },
            };
            console.log('🟢 Updated User Activity:', updatedActivity);
            return updatedActivity;
          });
        } catch (error) {
          console.error('❌ Error parsing active user message:', error);
        }
      });

      // ✅ 유저 비활성 상태 확인 (채팅방 퇴장)
      client.subscribe(`/app/room/inactive`, (message) => {
        try {
          const inactiveUser = JSON.parse(message.body);
          console.log('⚪ User Inactive WebSocket Data:', inactiveUser);

          setUserActivity((prev) => ({
            ...prev,
            [inactiveUser.userId]: { status: 'inactive', time: new Date() },
          }));
        } catch (error) {
          console.error('❌ Error parsing inactive user message:', error);
        }
      });

      setStompClient(client);
    };

    client.onWebSocketError = (error) => {
      console.error('❌ WebSocket Error:', error);
    };

    client.activate();

    return () => {
      console.log('🔌 WebSocket Disconnected');
      client.deactivate();
    };
  }, [teamId, userId, queryClient]);

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

  // ✅ 현재 유저가 활성 상태인지 확인
  const isActive = userActivity[userId]?.status === 'active';

  console.log('🟢 isActive:', isActive, 'userActivity:', userActivity);
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    scrollToBottom,
    chatContainerRef,
    isActive, // ✅ 활성 상태 반환
  };
};
