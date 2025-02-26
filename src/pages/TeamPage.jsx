import TeamCreate from '@components/team-page/TeamCreate';
import TeamList from '@components/team-page/TeamList';
import '@styles/pages/team-page.scss';

const TeamPage = () => {
  return (
    <div className='team-page'>
      <TeamCreate />
      <TeamList />
    </div>
  );
};

export default TeamPage;
