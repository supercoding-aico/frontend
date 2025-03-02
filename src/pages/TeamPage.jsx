import TeamCreate from '@components/team-page/TeamCreate';
import TeamList from '@components/team-page/TeamList';
import '@styles/pages/team-page.scss';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeamPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('access_token');
    console.log(token);
    if (!token) {
      alert('로그인이 필요합니다');
      navigate('/login');
    }
  }, []);
  return (
    <div className='team-page'>
      <TeamCreate />
      <TeamList />
    </div>
  );
};

export default TeamPage;
