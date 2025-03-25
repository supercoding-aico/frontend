import { useQuery } from '@tanstack/react-query';
import { Plus } from 'react-feather';
import '@styles/pages/home-page.scss';
import TeamCard from '@components/home-page/TeamCard';
import { getTeamList } from '@api/teamApi';

const HomePage = () => {
  // TODO: hook으로 분리
  const { data: teams = [] } = useQuery({
    queryKey: ['teamList'],
    queryFn: getTeamList,
    select: (data) => data?.data?.content ?? [],
  });

  console.log(teams);

  return (
    <div>
      <div className='team-container'>
        <button type='button' className='team-container__add-button'>
          <Plus />
        </button>
        {teams && teams.map((team) => <TeamCard key={team.teamId} team={team} />)}
      </div>
    </div>
  );
};

export default HomePage;
