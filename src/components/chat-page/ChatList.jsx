import { useState } from 'react';
import '@styles/components/chat-page/chat-list.scss';
import Button from '@components/common/Button';
import ChatModal from './ChatModal';

const WS_URL = process.env.REACT_APP_WS_URL;

const mockChatData = [
  {
    chatId: '12345',
    roomId: 230000,
    userDto: {
      userId: 1,
      nickname: '홍길동',
      email: 'hong@example.com',
      profileImage: 'https://via.placeholder.com/50',
    },
    createdAt: 1700000000,
  },
  {
    chatId: '67890',
    roomId: 230001,
    userDto: {
      userId: 2,
      nickname: '김영희',
      email: 'kim@example.com',
      profileImage: 'https://via.placeholder.com/50',
    },
    createdAt: 1700000001,
  },
  {
    chatId: '54321',
    roomId: 230002,
    userDto: {
      userId: 3,
      nickname: '이철수',
      email: 'lee@example.com',
      profileImage: 'https://via.placeholder.com/50',
    },
    createdAt: 1700000002,
  },
];

const ChatList = () => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const connectWebSocket = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      const socket = new WebSocket(WS_URL);

      socket.onopen = () => {
        console.log('✅ WebSocket 연결됨');
        setConnected(true);
      };

      socket.onmessage = (event) => {
        console.log('📩 메시지 수신:', event.data);
      };

      socket.onerror = (error) => {
        console.error('❌ WebSocket 에러:', error);
      };

      socket.onclose = () => {
        console.log('❌ WebSocket 연결 종료');
        setConnected(false);
      };

      setWs(socket);
    }
  };

  const handleOpenChat = () => {
    if (!connected) {
      connectWebSocket();
    }
    setIsChatModalOpen(true);
  };

  return (
    <div className='chat-container'>
      <Button theme='accent' onClick={handleOpenChat}>
        {connected ? '채팅 연결됨 ✅' : '채팅 시작하기'}
      </Button>

      <div className='chat-list'>
        {mockChatData.map((chat) => (
          <div key={chat.chatId} className='chat-item'>
            <img
              src={chat.userDto.profileImage}
              alt={chat.userDto.nickname}
              className='chat-avatar'
            />
            <div className='chat-info'>
              <p className='chat-name'>{chat.userDto.nickname}</p>
              <p className='chat-room'>방 ID: {chat.roomId}</p>
            </div>
          </div>
        ))}
        {isChatModalOpen && <ChatModal ws={ws} onClose={() => setIsChatModalOpen(false)} />}
      </div>
    </div>
  );
};
export default ChatList;
