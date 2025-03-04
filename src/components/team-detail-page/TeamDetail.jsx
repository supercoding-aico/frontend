import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '@styles/components/team-detail-page/team-detail.scss';
import { useQuery } from '@tanstack/react-query';
import { getTeamList } from '@api/teamApi';
import TeamMemberList from './TeamMemberList';
import TeamInvite from './TeamInvites';
import TeamLeave from './TeamLeave';
import { ArrowDownCircle } from 'react-feather';
import Cookies from 'js-cookie';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [openAccordion, setOpenAccordion] = useState(null);

  // 리액트 쿼리로 팀 데이터 가져오기
  const {
    data: teamData,
    isLoading,
    isError,
  } = useQuery({
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

  if (isLoading) return <p>⏳ 팀 정보를 불러오는 중...</p>;
  if (isError || !teamData) return <p>🚨 팀 정보를 불러오지 못했습니다.</p>;

  return (
    <div className='team-detail'>
      <h1 className='team-detail__title'>{teamData.name}</h1>

      <div className='team-detail__accordion'>
        {/* 🟢 팀 멤버 리스트 */}
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
          {openAccordion === 'members' && <TeamMemberList teamId={Number(teamId)} />}
        </div>

        {/* 팀 초대 */}
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

        {/*팀 탈퇴 */}
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
          {openAccordion === 'leave' && <TeamLeave teamId={teamId} />}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
