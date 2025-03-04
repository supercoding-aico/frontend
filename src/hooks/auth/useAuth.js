import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signup, login, verifyLogin, logout } from '@api/authApi';

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

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.data);
    },
    onError: () => {
      queryClient.removeQueries(['user']);
    },
  });
};

export const useVerifyLogin = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await verifyLogin();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
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
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(['user']);
    },
  });
};
