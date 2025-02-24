import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '@api/authApi';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation(signup, {
    onSuccess: () => {
      alert('회원가입 성공!');
      navigate('/login');
    },
    onError: (error) => {
      alert(`회원가입 실패: ${error.response?.data?.message || '알 수 없는 오류'}`);
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation(login, {
    onSuccess: (data) => {
      alert('로그인 성공!');
      localStorage.setItem('accessToken', data.token);
      navigate('/');
    },
    onError: (error) => {
      alert(`로그인 실패: ${error.response?.data?.message || '알 수 없는 오류'}`);
    },
  });
};
