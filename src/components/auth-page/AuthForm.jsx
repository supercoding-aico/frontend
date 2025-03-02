import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'react-feather';
import { useRef, useState, useMemo } from 'react';
import '@styles/components/auth-page/auth-form.scss';
import P from '@components/common/P';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';
import { useSignup, useLogin } from '@hooks/useAuth';
import { isEmailAvailable, isNicknameAvailable } from '@api/authApi';

const AuthForm = () => {
  const location = useLocation();

  const passwordRef = useRef('');
  const formValuesRef = useRef({ email: '', nickname: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const { mutate: signupMutate } = useSignup();
  const { mutate: loginMutate } = useLogin();

  const pathname = location.pathname.split('/')[1];
  const isLogin = pathname === 'login';

  const authFormFields = useMemo(() => {
    const fields = [
      {
        id: 'email',
        label: '이메일',
        type: 'email',
        onChange: (value) => (
          (formValuesRef.current = { ...formValuesRef.current, email: value }),
          setIsEmailChecked(false)
        ),
        buttonProps: isLogin ? undefined : (
          <Button
            type='button'
            theme={isEmailChecked ? 'disabled' : 'primary'}
            onClick={() => checkDuplicate('email')}
          >
            {isEmailChecked ? <CheckCircle size={16} /> : '중복 확인'}
          </Button>
        ),
      },
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
          onChange: (value) => (
            (formValuesRef.current = { ...formValuesRef.current, nickname: value }),
            setIsNicknameChecked(false)
          ),
          buttonProps: (
            <Button
              type='button'
              theme={isNicknameChecked ? 'disabled' : 'primary'}
              onClick={() => checkDuplicate('nickname')}
            >
              {isNicknameChecked ? <CheckCircle size={16} /> : '중복 확인'}
            </Button>
          ),
        },
        { id: 'phoneNumber', label: '전화번호', type: 'tel' }
      );
    }

    return fields;
  }, [isLogin, isEmailChecked, isNicknameChecked]);

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

  const checkDuplicate = async (fieldId) => {
    const value = formValuesRef.current[fieldId];
    const validator = authValidators[fieldId]?.validator;

    if (!value) {
      setErrorMessage(`${fieldId === 'email' ? '이메일' : '닉네임'}을 입력해주세요.`);
      return;
    }

    if (validator instanceof RegExp && !validator.test(value)) {
      setErrorMessage(authValidators[fieldId].helpText);
      return;
    }

    try {
      let res;
      if (fieldId === 'email') {
        res = await isEmailAvailable({ email: value });
        setIsEmailChecked(res?.data.check);
      } else if (fieldId === 'nickname') {
        res = await isNicknameAvailable({ nickname: value });
        setIsNicknameChecked(res?.data.check);
      }

      if (res?.data.check) {
        setErrorMessage('');
      } else {
        setErrorMessage(`이미 사용 중인 ${fieldId === 'email' ? '이메일' : '닉네임'}입니다.`);
      }
    } catch (error) {
      setErrorMessage('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = {};

    formData.forEach((value, key) => {
      if (key === 'passwordConfirm') return;

      if (key === 'phoneNumber') {
        formValues[key] = value.replace(/-/g, '');
        return;
      }

      formValues[key] = value;
    });

    // TODO: 예외처리 추가
    if (isLogin) {
      loginMutate(formValues, {
        onError: (err) => {
          const code = err.response.status;
          switch (code) {
            case 406:
              setErrorMessage(window.errorMessages.auth.INVALID_CREDENTIALS);
              break;
          }
        },
      });
    } else {
      signupMutate(formValues);
    }
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
            button={field.buttonProps}
            validator={authValidators[field.id]?.validator}
            helpText={authValidators[field.id]?.helpText}
          />
        ))}
      </div>
      <P theme='helptext'>{errorMessage}</P>
      <Button
        type='submit'
        theme={isEmailChecked && isNicknameChecked ? 'accent' : 'disabled'}
        isFull={true}
      >
        {isLogin ? '로그인' : '회원가입'}
      </Button>
    </form>
  );
};

export default AuthForm;
