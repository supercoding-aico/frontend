import '@styles/pages/auth-page.scss';
import AuthForm from '@components/auth-page/AuthForm';

const AuthPage = () => {
  return (
    <div className='auth-page'>
      <section className='auth-page__form-container'>
        <AuthForm />
      </section>
    </div>
  );
};

export default AuthPage;
