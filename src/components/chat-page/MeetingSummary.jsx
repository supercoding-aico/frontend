import React from 'react';
import { useSummarize } from '@hooks/meeting/useSummarize';

const MeetingSummary = ({ messages }) => {
  const { summarizeChat, summary, loading } = useSummarize();

  const handleSummarize = () => {
    summarizeChat(messages);
  };

  return (
    <>
      <div className='meetingHeader'>
        <button onClick={handleSummarize} className='summarizeBtn' disabled={loading}>
          {loading ? '요약 중...' : '회의록 요약+'}
        </button>
      </div>

      {summary && (
        <div className='summaryBox'>
          <h3>📌 AI 요약 결과</h3>
          <p>{summary}</p>
        </div>
      )}
    </>
  );
};

export default MeetingSummary;
