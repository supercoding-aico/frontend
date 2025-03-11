import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const WS_URL = 'wss://www.ai-co.store/aiCoWebsocket';

const useWebSocket = (roomId) => {
  const queryClient = useQueryClient();
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('✅ WebSocket 연결됨');
      socket.send(JSON.stringify({ type: 'subscribe', roomId }));
    };

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log('📩 메시지 수신:', newMessage);

      queryClient.setQueryData(['chatMessages', roomId], (old = []) => [...old, newMessage]);
    };

    socket.onerror = (error) => console.error('❌ WebSocket 에러:', error);
    socket.onclose = () => console.log('❌ WebSocket 연결 종료');

    setWs(socket);

    return () => socket.close();
  }, [roomId, queryClient]);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'message', roomId, data: message }));
    }
  };

  return { sendMessage };
};

export default useWebSocket;
