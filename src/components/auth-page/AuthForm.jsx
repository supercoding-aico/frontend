import { useLocation } from 'react-router-dom';
import '@styles/components/auth-page/auth-form.scss';
import P from '@components/common/P';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';

const AuthForm = ({ authFormFields, authValidators, handleSubmit, isFormAvailable }) => {
  const location = useLocation();

  const pathname = location.pathname.split('/')[1];
  const isLogin = pathname === 'login';

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
      <Button
        type='submit'
        theme={isLogin ? 'accent' : isFormAvailable ? 'accent' : 'disabled'}
        isFull={true}
      >
        {isLogin ? '로그인' : '회원가입'}
      </Button>
    </form>
  );
};

export default AuthForm;
