import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { __signup, __login } from '@redux/slice/userSlice';
import '@styles/components/auth-page/auth-form.scss';
import P from '@components/common/P';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');

  const pathname = location.pathname.split('/')[1];

  const authFormFields =
    pathname === 'login'
      ? [
          { id: 'email', label: '이메일', type: 'email' },
          {
            id: 'password',
            label: '비밀번호',
            type: 'password',
          },
        ]
      : [
          { id: 'email', label: '이메일', type: 'email', onclick: () => {} },
          {
            id: 'password',
            label: '비밀번호',
            type: 'password',
            onChange: (value) => setPassword(value),
          },
          {
            id: 'passwordConfirm',
            label: '비밀번호 재확인',
            type: 'password',
          },
          { id: 'nickname', label: '닉네임', type: 'text', onclick: () => {} },
          { id: 'phoneNumber', label: '전화번호', type: 'tel' },
        ];

  const authValidators = {
    email: {
      validator: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      helpText: '이메일 형식에 맞지 않습니다.',
    },
    password: {
      validator: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      helpText: '비밀번호는 8~20자 사이의 영문자, 숫자, 특수문자만 가능합니다.',
    },
    passwordConfirm: {
      validator: (value) => value === password,
      helpText: '비밀번호가 일치하지 않습니다.',
    },
    phoneNumber: {
      validator: /^[\d-]+$/,
      helpText: '전화번호를 확인해주세요',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    // TODO: 코드 깔끔하게 수정+예외처리
    if (pathname === 'signup') {
      dispatch(__signup(formValues)).then((res) => {
        navigate('/login');
      });
    } else if (pathname === 'login') {
      dispatch(__login(formValues)).then((res) => {
        navigate('/', { replace: true });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <P theme='title'>{pathname === 'login' ? '로그인' : '회원가입'}</P>
      <div>
        {authFormFields.map((field) => (
          <FormInput
            key={field.id}
            name={field.id}
            label={field.label}
            type={field.type}
            onChange={field.onChange}
            validator={authValidators[field.id]?.validator}
            helpText={authValidators[field.id]?.helpText}
            onclick={authValidators[field.id]?.onclick}
          />
        ))}
      </div>
      <Button type='submit' theme='accent' isFull={true}>
        {pathname === 'login' ? '로그인' : '회원가입'}
      </Button>
    </form>
  );
};

export default AuthForm;
