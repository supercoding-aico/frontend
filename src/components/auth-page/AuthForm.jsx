import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useMemo } from 'react';
import { __signup, __login } from '@redux/slice/userSlice';
import '@styles/components/auth-page/auth-form.scss';
import P from '@components/common/P';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const passwordRef = useRef('');

  const pathname = location.pathname.split('/')[1];
  const isLogin = pathname === 'login';

  const authFormFields = useMemo(() => {
    const fields = [
      { id: 'email', label: '이메일', type: 'email', onClick: () => checkDuplicate('email') },
      {
        id: 'password',
        label: '비밀번호',
        type: 'password',
        onChange: (value) => (passwordRef.current = value),
      },
    ];

    if (!isLogin) {
      fields.push(
        { id: 'passwordConfirm', label: '비밀번호 재확인', type: 'password' },
        {
          id: 'nickname',
          label: '닉네임',
          type: 'text',
          onClick: () => checkDuplicate('nickname'),
        },
        { id: 'phoneNumber', label: '전화번호', type: 'tel' }
      );
    }

    return fields;
  }, [isLogin]);

  const authValidators = useMemo(
    () => ({
      email: { validator: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, helpText: '이메일 형식에 맞지 않습니다.' },
      password: {
        validator: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        helpText: '비밀번호는 8~20자 사이의 영문자, 숫자, 특수문자만 가능합니다.',
      },
      passwordConfirm: {
        validator: (value) => value === passwordRef.current,
        helpText: '비밀번호가 일치하지 않습니다.',
      },
      phoneNumber: { validator: /^[\d-]+$/, helpText: '전화번호를 확인해주세요' },
    }),
    []
  );

  // TODO: 중복확인 API 호출
  const checkDuplicate = (fieldId) => {
    console.log(fieldId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = {};
    const action = isLogin ? __login : __signup;

    formData.forEach((value, key) => {
      if (key === 'passwordConfirm') return;
      formValues[key] = value;
    });

    // TODO: 예외처리 추가
    dispatch(action(formValues)).then((res) => {
      console.log('Dispatch Result', res);
      navigate(isLogin ? '/' : '/login', { replace: isLogin });
    });
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <P theme='title'>{isLogin ? '로그인' : '회원가입'}</P>
      <div>
        {authFormFields.map((field) => (
          <FormInput
            key={field.id}
            name={field.id}
            label={field.label}
            type={field.type}
            onChange={field.onChange}
            onClick={field.onClick}
            validator={authValidators[field.id]?.validator}
            helpText={authValidators[field.id]?.helpText}
          />
        ))}
      </div>
      <Button type='submit' theme='accent' isFull={true}>
        {isLogin ? '로그인' : '회원가입'}
      </Button>
    </form>
  );
};

export default AuthForm;
