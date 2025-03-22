import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '@styles/components/team-detail-page/team-detail.scss';
import { useQuery } from '@tanstack/react-query';
import { getTeamList } from '@api/teamApi';
import TeamMemberList from './TeamMemberList';
import TeamInvite from './TeamInvites';
import TeamLeave from './TeamLeave';
import { ArrowDownCircle } from 'react-feather';
import { useSelector } from 'react-redux';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [openAccordion, setOpenAccordion] = useState(null);
  const loggedInUserId = useSelector((state) => state.user.userInfo.userId);

  const { data: teamData } = useQuery({
    queryKey: ['teamDetail', teamId],
    queryFn: async () => {
      const data = await getTeamList();
      return data.data.content.find((team) => team.teamId === Number(teamId));
    },
    enabled: !!teamId,
  });

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className='team-detail'>
      <h1 className='team-detail__title'>{teamData?.name || '로딩 중...'}</h1>

      <div className='team-detail__accordion'>
        <div className='team-detail__accordion-item'>
          <button
            className='team-detail__accordion-item-header'
            onClick={() => toggleAccordion('members')}
          >
            <span>팀 멤버</span>
            <ArrowDownCircle
              className={`team-detail__icon ${openAccordion === 'members' ? 'rotated' : ''}`}
            />
          </button>
          {openAccordion === 'members' && (
            <TeamMemberList teamId={Number(teamId)} loggedInUserId={loggedInUserId} />
          )}
        </div>

        <div className='team-detail__accordion-item'>
          <button
            className='team-detail__accordion-item-header'
            onClick={() => toggleAccordion('invite')}
          >
            <span>팀 멤버 초대</span>
            <ArrowDownCircle
              className={`team-detail__icon ${openAccordion === 'invite' ? 'rotated' : ''}`}
            />
          </button>
          {openAccordion === 'invite' && <TeamInvite teamId={teamId} />}
        </div>

        <div className='team-detail__accordion-item'>
          <button
            className='team-detail__accordion-item-header'
            onClick={() => toggleAccordion('leave')}
          >
            <span>팀 탈퇴</span>
            <ArrowDownCircle
              className={`team-detail__icon ${openAccordion === 'leave' ? 'rotated' : ''}`}
            />
          </button>
          {openAccordion === 'leave' && (
            <TeamLeave teamId={teamId} loggedInUserId={loggedInUserId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
