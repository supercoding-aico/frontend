import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMeetingSummary } from '@api/meetingApi';

export const useSummarize = () => {
  const { teamId } = useParams();
  const userId = useSelector((state) => state.user.userInfo.userId);
  const nickname = useSelector((state) => state.user.userInfo.nickname);
  const queryClient = useQueryClient();

  const formatSummaryForAPI = (messages) => {
    return messages.map((msg) => ({
      userId,
      nickname: nickname || 'AI',
      content: msg,
    }));
  };
  const {
    mutate: summarizeChat,
    data,
    isPending: loading,
  } = useMutation({
    mutationFn: async (messages) => {
      const payload = formatSummaryForAPI(messages);
      const response = await postMeetingSummary({ teamId, messages: payload });

      if (response.code === 200) return response.data;
      throw new Error('회의록 요약 실패');
    },
    onSuccess: (data) => {
      alert('회의록 요약이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['meetingList', teamId] });
    },
    onError: (error) => {
      console.error('회의록 요약 오류:', error);
      alert('회의록 요약 실패!');
    },
  });

  return {
    summarizeChat,
    summary: data?.aiResponse?.contentResponse || '',
    loading,
    lastResponse: data,
  };
};
