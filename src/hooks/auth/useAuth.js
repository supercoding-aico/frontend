import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signup, login, verifyLogin, logout, withdraw } from '@api/authApi';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.data);
      navigate('/', { replace: true });
    },
    onError: () => {
      queryClient.removeQueries(['user']);
    },
  });
};

export const useCurrentUser = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const cachedUser = queryClient.getQueryData(['user']);
      if (cachedUser) return cachedUser;

      const res = await verifyLogin();
      return res.data;
    },
    staleTime: Infinity,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(['user']);
    },
  });
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      queryClient.removeQueries(['user']);
    },
  });
};
