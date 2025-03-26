import '@styles/components/auth-page/auth-form.scss';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';

const AuthForm = ({ authFormFields, authValidators, handleSubmit, isFormAvailable, isLogin }) => {
  return (
    <form onSubmit={handleSubmit} className='auth-form'>
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
