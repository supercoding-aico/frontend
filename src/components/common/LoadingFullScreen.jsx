import { useState, useEffect } from 'react';
import '@styles/components/common/loading-full-screen.scss';
import logo from '@assets/images/logo.gif';

const LoadingFullScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='loading-full-screen'>
      <img src={logo} alt='로딩 중...' className='loading-full-screen__image' />
      <p className='loading-full-screen__text'>로딩 중{dots}</p>
    </div>
  );
};

export default LoadingFullScreen;
