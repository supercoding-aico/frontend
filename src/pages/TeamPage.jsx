import TeamCreate from '@components/team-page/TeamCreate';
import TeamList from '@components/team-page/TeamList';
import '@styles/pages/team-page.scss';
import { ToastContainer } from 'react-toastify';

const TeamPage = () => {
  return (
    <div className='team-page'>
      <TeamCreate />
      <TeamList />
      <ToastContainer position='top-right' autoClose={1500} />
    </div>
  );
};

export default TeamPage;
