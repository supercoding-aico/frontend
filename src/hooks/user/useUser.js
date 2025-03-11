import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileImage } from '@api/userApi';

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateProfileImage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
