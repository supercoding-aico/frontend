import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '@api/authApi';
import { extractToken, clearToken } from '@utils/handleToken';
import { setUser, clearUser } from '@redux/slice/userSlice';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      navigate('/', { replace: true });
    },
    onError: (err) => {
      // TODO: 예외처리 추가
      console.error(err);
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      extractToken(data);
      dispatch(setUser(data.data));
      navigate('/', { replace: true });
    },
    onError: () => {
      clearToken();
      dispatch(clearUser());
    },
  });
};
