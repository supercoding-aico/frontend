import { useLocation, useNavigate } from 'react-router-dom';
import '@styles/components/auth-page/auth-form.scss';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  const authFormFields =
    pathname === '/login'
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
          { id: 'email', label: '이메일', type: 'email', required: true },
          {
            id: 'password',
            label: '비밀번호',
            type: 'password',
            required: true,
          },
          { id: 'tel', label: '전화번호', type: 'tel', required: true },
        ];

  const authValidators = {
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      helpText: '이메일 형식에 맞지 않습니다.',
    },
    password: {
      regex: /^[A-Za-z0-9]{8,20}$/,
      helpText: '비밀번호는 8~20자 사이의 영문자와 숫자만 가능합니다.',
    },
    passwordConfirm: {
      regex: /^[A-Za-z0-9]{8,20}$/,
      helpText: '비밀번호는 8~20자 사이의 영문자와 숫자만 가능합니다.',
    },
    tel: {
      regex: /^[\d-]+$/,
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
      <h2>{pathname === '/signup' ? '회원가입' : '로그인'}</h2>
      <div>
        {authFormFields.map((field) =>
          field.type === 'radio' ? (
            <div key={field.id}>
              <label>{field.label}</label>
              <div>
                {field.options.map((option) => (
                  <label key={option.value}>
                    <input
                      type='radio'
                      name={field.id}
                      value={option.value}
                      required={field.required}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <FormInput
              key={field.id}
              label={field.label}
              fieldData={field}
              regex={authValidators[field.id]?.regex}
              helpText={authValidators[field.id]?.helpText}
            />
          )
        )}
      </div>
      <Button type='submit'>{pathname === '/signup' ? '회원가입' : '로그인'}</Button>
    </form>
  );
};

export default AuthForm;
