import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Send } from 'react-feather';
import '@styles/components/chat-page/chat-room.scss';
import { useChat } from '@hooks/chat/useChat';
import { useSummarize } from '@hooks/meeting/useSummarize';
import { useMeetingList } from '@hooks/meeting/useMeetingList';
import MeetingList from '@components/meeting-page/MeetingList';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const { teamId } = useParams();
  const userId = useSelector((state) => state.user.userInfo.userId);
  const { messages, isLoading, error, sendMessage, scrollToBottom, chatContainerRef } = useChat(
    teamId,
    userId
  );

  const { summarizeChat, summary, loading, lastResponse } = useSummarize();
  const { meetingList, fetchMeetings, addMeeting } = useMeetingList(teamId);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  const handleSummarize = async () => {
    const chatMessages = messages.map((msg) => msg.content);
    await summarizeChat(chatMessages);
    fetchMeetings();
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>채팅을 불러오는 중 오류 발생</p>;

  return (
    <div className='chatPage'>
      {/* ✅ 왼쪽: 채팅창 */}
      <div className='chatContainer' ref={chatContainerRef}>
        <div className='chatHeader'>💬 실시간 채팅</div>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id || msg.createdAt} className='message'>
              <span className='nickname'>{msg.userInfo?.nickname || '익명'}: </span>
              <span className='text'>{msg.content}</span>
            </div>
          ))
        ) : (
          <p className='noMessage'>📭 메시지가 없습니다.</p>
        )}
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

      {/* ✅ 오른쪽: 회의록 요약 및 리스트 */}
      <div className='meetingContainer'>
        <div className='meetingHeader'>
          <button onClick={handleSummarize} className='summarizeBtn' disabled={loading}>
            {loading ? '요약 중...' : '회의록 요약+'}
          </button>
        </div>

        {/* ✅ AI 요약 결과 출력 */}
        {summary && (
          <div className='summaryBox'>
            <h3>📌 AI 요약 결과</h3>
            <p>{summary}</p>
          </div>
        )}

        {/* ✅ 회의록 리스트 */}
        <MeetingList teamId={teamId} />
      </div>
    </div>
  );
};

export default ChatRoom;
