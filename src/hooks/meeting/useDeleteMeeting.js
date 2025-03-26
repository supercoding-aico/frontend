import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMeeting } from '@api/meetingApi';
import { toast } from 'react-toastify';

export const useDeleteMeeting = (teamId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMeeting,
    onSuccess: (_, deletedMeetingId) => {
      toast.success('회의록이 삭제되었습니다.');

      queryClient.setQueryData(['meetingList', teamId], (oldData) =>
        oldData?.filter((meeting) => meeting.meetingId !== deletedMeetingId)
      );
    },
    onError: () => {
      toast.error('회의록 삭제 중 오류가 발생했어요.');
    },
  });
};
