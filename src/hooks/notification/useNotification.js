import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getNotification, readNotification } from '@api/notificationApi';

export const useGetNotification = () => {
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

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (queryString) => {
      const res = await readNotification(queryString);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notification']);
    },
  });
};
