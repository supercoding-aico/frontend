import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import '@styles/components/team-detail-page/team-detail.scss';
import Button from '@components/common/Button';
import FormInput from '@components/common/FormInput';
import { getTeamList, inviteMember } from '@api/teamApi';
import TeamMemberList from './TeamMemberList';
import TeamInvite from './TeamInvites';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [memberData, setMemberData] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await getTeamList();
        const teamInfo = data.data.content.find((team) => team.teamId === Number(teamId));
        setTeamData(teamInfo);
      } catch (error) {
        console.error('❌ 팀 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchTeamData();
  }, [teamId]);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleEmailChange = (inviteEmail) => {
    setInviteEmail(inviteEmail);
  };

  if (!teamData) return <p>⏳ 팀 정보를 불러오는 중...</p>;

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
            <span>👥 팀 멤버</span>
            <MdOutlineArrowDropDownCircle
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
            <span>📩 팀 멤버 초대</span>
            <MdOutlineArrowDropDownCircle
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
            <span>🚪 팀 탈퇴</span>
            <MdOutlineArrowDropDownCircle
              className={`team-detail__icon ${openAccordion === 'leave' ? 'rotated' : ''}`}
            />
          </button>
          {openAccordion === 'leave' && (
            <div className='team-detail__accordion-item-opened-content'>
              <Button>팀 탈퇴하기</Button>
              <select className='team-detail__select'>
                <option value='' disabled>
                  탈퇴시킬 멤버 선택
                </option>
                {memberData.map((member) => (
                  <option key={member.userId} value={member.userId}>
                    {member.nickname} ({member.teamRole})
                  </option>
                ))}
              </select>
              <Button>팀 멤버 탈퇴시키기</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
