import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMeetingSummary } from '@api/meetingApi';
import { toast } from 'react-toastify';

export const useSummarize = () => {
  const { teamId } = useParams();
  const queryClient = useQueryClient();

  const formatSummaryForAPI = (messages) => {
    return messages.map((msg) => ({
      userId: msg.userInfo?.userId || 0,
      nickname: msg.userInfo?.nickname || '익명',
      content: msg.content,
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
      toast.sucesss('회의록 요약이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['meetingList', teamId] });
    },
    onError: (error) => {
      console.error('회의록 요약 오류:', error);
      toast.error('회의록 요약 실패!');
    },
  });

  return {
    summarizeChat,
    summary: data?.aiResponse?.contentResponse || '',
    loading,
    lastResponse: data,
  };
};
