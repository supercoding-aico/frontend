import { useState } from 'react';
import axios from '@axios/axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useSummarize = () => {
  const { teamId } = useParams();
  const userId = useSelector((state) => state.user.userInfo.userId);
  const nickname = useSelector((state) => state.user.userInfo.nickname);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  // ✅ API 요구 형식에 맞춰 데이터 변환
  const formatSummaryForAPI = (messages, userId, nickname) => {
    return messages.map((msg) => ({
      userId: userId,
      nickname: nickname || 'AI',
      content: msg,
    }));
  };

  const summarizeChat = async (messages) => {
    setLoading(true);

    try {
      // ✅ 1. OpenAI API를 통해 요약 생성
      const response = await axios.post(
        `/api/meeting/${teamId}`,
        formatSummaryForAPI(messages, userId, nickname) // 요청 데이터
      );
      console.log('🟢 API Response:', response.data); //

      if (response.data.code === 200) {
        const aiSummary = response.data.data.aiResponse.contentResponse; // ✅ 요약된 회의록 가져오기
        setSummary(aiSummary);
        alert('회의록 요약이 완료되었습니다!');
      } else {
        throw new Error('회의록 요약 실패');
      }
    } catch (error) {
      console.error('회의록 요약 오류:', error);
      alert('회의록 요약 실패!');
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, summarizeChat };
};
