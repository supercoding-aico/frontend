import { CheckCircle } from 'react-feather';
import { useEffect, useRef, useState, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '@styles/pages/auth-page.scss';
import AuthForm from '@components/auth-page/AuthForm';
import Button from '@components/common/Button';
import { useSignup, useLogin } from '@hooks/useAuth';
import { isEmailAvailable, isNicknameAvailable } from '@api/authApi';

const AuthPage = () => {
  const passwordRef = useRef('');
  const formValuesRef = useRef({ email: '', nickname: '' });
  const [errorMessage, setErrorMessage] = useState(''); // toast에 적용
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
      setErrorMessage(window.errMsgs.validation.EMPTY_VALUE);
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
        setErrorMessage(window.errMsgs.auth.ALREADY_EXISTS);
      }
    } catch (error) {
      setErrorMessage(window.errMsgs.network.UNKNOWN);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = {};
    let hasError = false;

    formData.forEach((value, key) => {
      if (key === 'passwordConfirm') return;

      if (key === 'phoneNumber') {
        formValues[key] = value.replace(/-/g, '');
        return;
      }

      formValues[key] = value;

      const validator = authValidators[key]?.validator;
      if (validator) {
        if (validator instanceof RegExp && !validator.test(value)) {
          hasError = true;
        } else if (typeof validator === 'function' && !validator(value)) {
          hasError = true;
        }
      }
    });

    console.log('!!!', hasError);

    if (hasError) return;

    // TODO: 예외처리 추가
    if (!hasError && isLogin) {
      loginMutate(formValues, {
        onError: (err) => {
          const code = err.response.status;
          switch (code) {
            case 406:
              setErrorMessage(window.errMsgs.auth.INVALID_CREDENTIALS);
              break;
          }
        },
      });
    } else if (!hasError && !isLogin) {
      signupMutate(formValues);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    setErrorMessage('');
  }, [errorMessage]);

  return (
    <div className='auth-page'>
      <ToastContainer position='top-right' autoClose={3000} />
      <section className='auth-page__form-container'>
        <AuthForm
          authFormFields={authFormFields}
          authValidators={authValidators}
          onSubmit={handleSubmit}
          isFormAvailable={isEmailChecked && isNicknameChecked}
        />
      </section>
    </div>
  );
};

export default AuthPage;
