import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '@api/authApi';
import { setUser } from '@redux/slice/userSlice';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setUser(data));
      navigate('/');
    },
    onError: (error) => {
      // TODO: 예외처리 추가
      console.error(error);
    },
  });
};
