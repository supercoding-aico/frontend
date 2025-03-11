import axios from '@axios/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ✅ 채팅방 목록 조회
export const getChatRooms = async (teamId) => {
  const response = await axios.get(`/api/chat/${teamId}?page=1`);
  return response.data;
};

export const useChatRooms = (teamId) => {
  return useQuery({
    queryKey: ['chatRooms', teamId],
    queryFn: () => getChatRooms(teamId),
    staleTime: 60000, // 1분 캐싱
  });
};

// ✅ 특정 채팅방의 메시지 조회
export const getChatMessages = async (roomId, page = 1) => {
  const response = await axios.get(`/api/chat/room/${roomId}?page=${page}`);
  return response.data;
};

export const useChatMessages = (roomId, page = 1) => {
  return useQuery({
    queryKey: ['chatMessages', roomId, page],
    queryFn: () => getChatMessages(roomId, page),
    staleTime: 60000,
  });
};

// ✅ 채팅 메시지 전송
export const sendMessage = async (roomId, message) => {
  const response = await axios.post(`/api/chat/room/${roomId}/send`, { message });
  return response.data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, message }) => sendMessage(roomId, message),
    onSuccess: (_, { roomId }) => {
      queryClient.invalidateQueries(['chatMessages', roomId]); // 채팅 목록 갱신
    },
  });
};
