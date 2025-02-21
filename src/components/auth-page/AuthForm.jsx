import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '@styles/components/auth-page/auth-form.scss';
import P from '@components/common/P';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname.split('/')[1];

  const authFormFields =
    pathname === 'login'
      ? [
          { id: 'email', label: '이메일', type: 'email', required: true },
          {
            id: 'password',
            label: '비밀번호',
            type: 'password',
            required: true,
          },
        ]
      : [
          { id: 'email', label: '이메일', type: 'email', required: true, onclick: () => {} },
          {
            id: 'password',
            label: '비밀번호',
            type: 'password',
            required: true,
            isButton: false,
          },
          { id: 'nickname', label: '닉네임', type: 'text', required: true, onclick: () => {} },
          { id: 'tel', label: '전화번호', type: 'tel', required: true },
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
    tel: {
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

    // if (pathname === '/signup') {
    //   dispatch(__signup(formValues)).then((res) => {
    //     navigate('/login');
    //   });
    // } else if (pathname === '/login') {
    //   dispatch(__login(formValues)).then((res) => {
    //     navigate('/', { replace: true });
    //   });
    // }
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <P theme='title'>{pathname === 'login' ? '로그인' : '회원가입'}</P>
      <div>
        {authFormFields.map((field) => (
          <FormInput
            key={field.id}
            label={field.label}
            fieldData={field}
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
