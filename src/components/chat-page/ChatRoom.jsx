import { useState, useEffect } from 'react';
import axios from '@axios/axios.js';
import { Client } from '@stomp/stompjs';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const teamId = 43;
  const userId = 34;

  // ✅ 1️⃣ 기존 채팅 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log('🟡 Fetching chat history...');
        const res = await axios.get(`/api/chat/${teamId}?page=0`);
        console.log('📩 API Response:', res.data);

        if (!res.data || !res.data.data) {
          console.warn('⚠️ API 응답이 비어 있음:', res.data);
          return;
        }

        if (Array.isArray(res.data.data.content)) {
          console.log('✅ Loaded messages:', res.data.data.content);
          setMessages(res.data.data.content);
        } else {
          console.warn('⚠️ 예상과 다른 응답 구조:', res.data);
        }
      } catch (err) {
        console.error('❌ Failed to fetch messages', err);
      }
    };

    fetchMessages();
  }, [teamId]);

  // ✅ 2️⃣ WebSocket (STOMP) 연결
  useEffect(() => {
    const client = new Client({
      brokerURL: 'wss://www.ai-co.store/aiCoWebsocket',
      reconnectDelay: 5000, // 자동 재연결 설정
    });

    client.onConnect = () => {
      console.log('✅ STOMP WebSocket Connected');

      // ✅ 채팅방 구독
      client.subscribe(`/topic/room/${teamId}`, (message) => {
        console.log('📩 Received WebSocket message:', message.body);
        try {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => {
            if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
              return [...prevMessages, newMessage];
            }
            return prevMessages;
          });
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      });

      setStompClient(client);
    };

    client.onWebSocketError = (error) => {
      console.error('❌ WebSocket Error:', error);
    };

    client.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [teamId]);

  // ✅ 3️⃣ 메시지 전송 함수
  const sendMessage = () => {
    if (message.trim() && stompClient) {
      const newMessage = { id: Date.now(), teamId, userId, content: message };

      stompClient.publish({
        destination: '/app/room', // 백엔드에서 이 경로로 메시지를 받아야 함
        body: JSON.stringify(newMessage),
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div id='chat-container' style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <p
              key={msg.id || msg.createdAt} // ✅ React 리스트 키 오류 해결
              style={{
                color: msg.userId === userId ? 'blue' : 'black',
                textAlign: msg.userId === userId ? 'right' : 'left',
              }}
            >
              {msg.userId}: {msg.content}
            </p>
          ))
        ) : (
          <p>📭 메시지가 없습니다.</p>
        )}
      </div>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Enter 키 입력 시 전송
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
