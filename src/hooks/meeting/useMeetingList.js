import { useQuery } from '@tanstack/react-query';
import { getMeetingList } from '@api/meetingApi';

export const useMeetingList = (teamId) => {
  return useQuery({
    queryKey: ['meetingList', teamId],
    queryFn: () => getMeetingList(teamId),
    staleTime: 1000 * 60 * 5,
    enabled: !!teamId,
  });
};
