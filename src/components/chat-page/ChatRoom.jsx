import { useState } from 'react';
import { Send } from 'react-feather';
import '@styles/components/chat-page/chat-room.scss';
import { useChat } from '@hooks/chat/useChat';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const { messages, isLoading, error, sendMessage, scrollToBottom, chatContainerRef } = useChat();

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>채팅을 불러오는 중 오류 발생</p>;

  return (
    <div className='chatRoom'>
      <div className='chatContainer' ref={chatContainerRef}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={msg.id || `${msg.createdAt}-${msg.userInfo?.userId}-${index}`}
              className='message'
            >
              <span className='nickname'>{msg.userInfo?.nickname || '익명'}: </span>
              <span className='text'>{msg.content}</span>
            </div>
          ))
        ) : (
          <p className='noMessage'>📭 메시지가 없습니다.</p>
        )}
      </div>
      <div className='inputContainer'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className='input'
          placeholder='메시지를 입력하세요...'
        />
        <button onClick={handleSendMessage} className='sendBtn'>
          <Send className='sendIcon' />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
