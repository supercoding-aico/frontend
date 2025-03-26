import '@styles/components/home-page/team-card.scss';
import { getRelativeTime } from '@utils/getRelativeTime';

const teamCardInfo = [{ id: 'lastMessageAt', label: '마지막 메시지' }];

const TeamCard = ({ team }) => {
  return (
    <div className='team-card'>
      <p className='team-card__team-name'>{team.name}</p>
      {teamCardInfo.map((info) => (
        <div key={info.id} className='team-card__info'>
          <span className='team-card__info--label'>{info.label}</span>
          <span className='team-card__info--value'>{getRelativeTime(team[info.id])}</span>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;
