import { CheckCircle } from 'react-feather';
import { useEffect, useRef, useState, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '@styles/pages/auth-page.scss';
import AuthForm from '@components/auth-page/AuthForm';
import Button from '@components/common/Button';
import { useSignup, useLogin } from '@hooks/auth/useAuth';
import { isEmailAvailable, isNicknameAvailable } from '@api/authApi';
import { regExp } from '@constants/regExp';
import { ERROR_MESSAGES } from '@constants/errorMessages';

const AuthPage = () => {
  const passwordRef = useRef('');
  const formValuesRef = useRef({ email: '', nickname: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const { mutate: signupMutate } = useSignup();
  const { mutate: loginMutate } = useLogin();

  const { authMsg, validationMsg } = ERROR_MESSAGES;

  const pathname = location.pathname.split('/')[1];
  const isLogin = pathname === 'login';
  let hasError = false;

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
      email: { validator: regExp.email, helpText: validationMsg.EMAIL_FORMAT },
      password: {
        validator: regExp.password,
        helpText: validationMsg.PASSWORD_WEAK,
      },
      passwordConfirm: {
        validator: (value) => value === passwordRef.current,
        helpText: validationMsg.PASSWORD_MISMATCH,
      },
      nickname: { validator: regExp.nickname, helpText: validationMsg.NICKNAME_WEAK },
      phoneNumber: { validator: regExp.phoneNumber, helpText: validationMsg.PHONE_NUMBER_FORMAT },
    }),
    []
  );

  const checkDuplicate = async (fieldId) => {
    const value = formValuesRef.current[fieldId];
    const validator = authValidators[fieldId]?.validator;

    if (!value) {
      setErrorMessage(validationMsg.EMPTY_VALUE);
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
        setErrorMessage(authMsg.ALREADY_EXISTS);
      }
    } catch (error) {
      setErrorMessage(authMsg.DEFAULT);
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

      const validator = authValidators[key]?.validator;
      if (validator) {
        if (validator instanceof RegExp && !validator.test(value)) {
          hasError = true;
        } else if (typeof validator === 'function' && !validator(value)) {
          hasError = true;
        }
      }
    });

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
          handleSubmit={handleSubmit}
          isFormAvailable={isEmailChecked && isNicknameChecked}
        />
      </section>
    </div>
  );
};

export default AuthPage;
