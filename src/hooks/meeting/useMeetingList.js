import { useQuery } from '@tanstack/react-query';
import axios from '@axios/axios';

export const useMeetingList = (teamId) => {
  return useQuery({
    queryKey: ['meetingList', teamId],
    queryFn: async () => {
      const response = await axios.get(`/api/meeting/${teamId}?page=0`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!teamId,
  });
};
