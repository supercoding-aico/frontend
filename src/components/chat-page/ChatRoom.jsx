import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Send } from 'react-feather';
import '@styles/components/chat-page/chat-room.scss';
import MeetingList from './MeetingList';
import MeetingSummary from './MeetingSummary';
import { useChatMessages } from '@hooks/chat/useChatMessages';
import { useChatSocket } from '@hooks/chat/useChatSocket';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const { teamId } = useParams();
  const user = useSelector((state) => state.user.userInfo);
  const userId = useSelector((state) => state.user.userInfo.userId);
  const chatContainerRef = useRef(null);
  const scrollTypeRef = useRef('new');
  const [showLoading, setShowLoading] = useState(false);
  const loadingTimerRef = useRef(null);

  const { messages, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatMessages(teamId);

  const { sendMessage } = useChatSocket({
    teamId,
    userId: user.userId,
    nickname: user.nickname,
  });

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const container = chatContainerRef.current;
      const prevScrollHeight = container.scrollHeight;

      scrollTypeRef.current = 'fetch';

      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          const newScrollHeight = container.scrollHeight;
          const diff = newScrollHeight - prevScrollHeight;
          container.scrollTop = diff;
        });
      });
    }
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    if (scrollTypeRef.current === 'new') {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }

    scrollTypeRef.current = 'new';
  }, [messages]);

  useEffect(() => {
    if (isFetchingNextPage) {
      setShowLoading(true);

      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);

      loadingTimerRef.current = setTimeout(() => {
        setShowLoading(false);
        loadingTimerRef.current = null;
      }, 1000);
    } else if (!isFetchingNextPage && !loadingTimerRef.current) {
      setShowLoading(false);
    }
  }, [isFetchingNextPage]);
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>채팅을 불러오는 중 오류 발생</p>;

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='chatHeaderFixed'>💬 실시간 채팅</div>
        {showLoading && <p className='loading'>📡 이전 메시지 불러오는 중...</p>}
        <div className='messageList' ref={chatContainerRef} onScroll={handleScroll}>
          {messages.length > 0 ? (
            messages.map((msg) => {
              const isMine = msg.userInfo?.userId === userId;
              return (
                <div
                  key={`${msg.chatId}-${msg.createdAt}`}
                  className={`message ${isMine ? 'mine' : 'other'}`}
                >
                  <span className='nickname'>{msg.userInfo?.nickname || '익명'}: </span>
                  <span className='text'>{msg.content}</span>
                </div>
              );
            })
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
      <div className='meetingContainer'>
        <MeetingSummary messages={messages} />
        <MeetingList teamId={teamId} />
      </div>
    </div>
  );
};

export default ChatRoom;
