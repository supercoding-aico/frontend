import { useMutation } from '@tanstack/react-query';
import { signup, login } from '@api/authApi';

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // TODO: 회원가입 처리
      console.log(data);
    },
    onError: (error) => {
      // TODO: 예외처리 추가
      console.error(error);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // TODO: 로그인 처리
      console.log(data);
    },
    onError: (error) => {
      // TODO: 예외처리 추가
      console.error(error);
    },
  });
};
