import TeamDetail from '@components/team-detail-page/TeamDetail';
import { ToastContainer } from 'react-toastify';
import '@styles/components/team-detail-page/team-detail.scss';

const TeamDetailPage = () => {
  return (
    <div className='team-detail-page'>
      <TeamDetail />
      <ToastContainer position='top-right' autoClose={1500} />
    </div>
  );
};

export default TeamDetailPage;
