import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const useNewMessage = (userId, setHasNewMessage) => {
  useEffect(() => {
    console.log('🧪 useNewMessage 훅 실행됨. userId:', userId);

    if (!userId) return;

    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws';
    console.log('🔗 WebSocket 연결 URL:', wsUrl);

    const client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP DEBUG]', str), // 👈 디버깅용
    });

    client.onConnect = () => {
      console.log('📩 /topic/toggle 구독 시작');
      client.subscribe(`/topic/toggle/${userId}`, async (msg) => {
        const shouldRefetch = JSON.parse(msg.body);
        console.log('📬 새로운 메시지 알림:', shouldRefetch, '리패치');

        if (shouldRefetch) {
          try {
            const res = await axios.get('/api/team/all?page=0');
            const teams = res.data;

            const hasUnread = teams.some(
              (team) =>
                team.lastMessageAt &&
                team.lastReadAt &&
                new Date(team.lastReadAt) < new Date(team.lastMessageAt)
            );

            setHasNewMessage(hasUnread);
          } catch (err) {
            console.error('❌ 팀 정보 조회 실패:', err);
          }
        }
      });
    };

    client.onWebSocketError = (error) => {
      console.error('❌ WebSocket 오류:', error);
    };

    client.onStompError = (frame) => {
      console.error('❌ STOMP 오류:', frame);
    };

    client.activate();

    return () => {
      console.log('🛑 /topic/toggle 구독 해제');
      client.deactivate();
    };
  }, [userId, setHasNewMessage]);
};

export default useNewMessage;
