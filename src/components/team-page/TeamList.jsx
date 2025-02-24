import P from '@components/common/P';
import '@styles/components/team-page/team-list.scss';
import { useNavigate } from 'react-router-dom';

// mock data
const teamsData = [
  { teamId: 1, name: '프로젝트 화이팅' },
  { teamId: 2, name: '팀 버스터즈' },
  { teamId: 3, name: '코드 챔피언' },
  { teamId: 4, name: '혁신 팀' },
  { teamId: 5, name: '아이디어 팩토리' },
];

const TeamList = () => {
  const navigate = useNavigate();

  const handleTitleClick = (team) => {
    navigate(`/team/detail/${team.teamId}`);
  };

  return (
    <div className='team-list'>
      <P theme='title'>팀 목록</P>
      {teamsData.map((team) => (
        <div className='team-list-item' key={team.teamId}>
          <span className='team-list-item__title' onClick={() => handleTitleClick(team)}>
            {team.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
