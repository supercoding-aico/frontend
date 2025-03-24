import { useInfiniteQuery } from '@tanstack/react-query';
import axios from '@axios/axios';

export const useChatMessages = (teamId) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['chatMessages', teamId],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await axios.get(`/api/chat/${teamId}?page=${pageParam}`);
        console.log(res.data.data, '데이터');
        return res.data?.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.last ? undefined : allPages.length;
      },
      enabled: !!teamId,
      staleTime: 10000,
    });

  const messages =
    data?.pages
      ?.flatMap((page) => page.content)
      ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) || [];

  return {
    messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
