import { useState, useEffect } from 'react';
import axios from '@axios/axios.js';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]); // ✅ 초기값을 빈 배열로 설정
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const teamId = 43;
  const userId = 34;

  useEffect(() => {
    // ✅ WebSocket 연결
    const ws = new WebSocket('wss://www.ai-co.store/aiCoWebsocket');

    ws.onopen = () => {
      console.log('✅ WebSocket Connected');
    };

    ws.onmessage = (event) => {
      try {
        const newMessage = JSON.parse(event.data);

        setMessages((prevMessages) => [...(prevMessages || []), newMessage]); // ✅ prevMessages 안전하게 처리
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('❌ WebSocket Disconnected');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chat/${teamId}?page=1`);
        console.log(res);
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('❌ Failed to fetch messages', err);
        setMessages([]); // ✅ 오류 발생 시 빈 배열로 초기화
      }
    };

    fetchMessages(); // ✅ 비동기 함수 실행
  }, [teamId]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const newMessage = { teamId, userId, content: message };

      // ✅ WebSocket을 통해 '/app/room' 경로로 메시지 전송
      socket.send(JSON.stringify({ destination: '/app/room', body: newMessage }));

      // ✅ 상태 업데이트 시 prevMessages가 배열인지 확인
      setMessages((prevMessages) => [...(prevMessages || []), newMessage]);

      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <p key={index}>
              {msg.userId}:{msg.content}
            </p>
          ))
        ) : (
          <p>메시지가 없습니다.</p> // ✅ 메시지가 없을 때 안내 문구
        )}
      </div>
      <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
