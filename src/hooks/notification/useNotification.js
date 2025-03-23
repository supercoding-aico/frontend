import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getNotification, readNotification } from '@api/notificationApi';

export const useGetNoitification = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: async () => {
      const res = await getNotification();
      return res.data;
    },
    staleTime: Infinity,
    retry: false,
  });
};
