import { useEffect, useState } from 'react';
import { getTeamMember } from '@api/teamApi'; // ✅ API 함수 임포트

const TeamMemberList = ({ teamId }) => {
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        if (!teamId) {
          console.error('🚨 teamId가 존재하지 않습니다.');
          return;
        }
        const members = await getTeamMember(teamId);
        setMemberData(members.data);
      } catch (error) {
        console.error('❌ 팀 멤버 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemberData();
  }, [teamId]);

  return (
    <div className='team-member-list'>
      <ul className='team-member-list__content'>
        {memberData.length > 0
          ? memberData.map((member) => (
              <li key={member.userId} className='team-member-list__item'>
                <span>이름 : {member.nickname}</span>
                <span>역할 : {member.teamRole}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TeamMemberList;
