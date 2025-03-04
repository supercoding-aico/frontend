import { useState, useEffect } from 'react';
import Button from '@components/common/Button';
import { getTeamMember, removeMember } from '@api/teamApi';
import { useNavigate } from 'react-router-dom';

const TeamLeave = ({ teamId, loggedInUserId }) => {
  const [memberData, setMemberData] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const members = await getTeamMember(teamId);
        setMemberData(members.data);

        // 로그인한 유저의 역할 확인
        const loggedInUser = members.data.find((member) => member.userId === loggedInUserId);
        if (loggedInUser) {
          setUserRole(loggedInUser.teamRole);
        }
      } catch (error) {
        console.error('팀 멤버 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemberData();
  }, [teamId, loggedInUserId]);

  const handleLeaveTeam = async () => {
    try {
      await removeMember(teamId, loggedInUserId, true);
      alert('팀에서 탈퇴했습니다.');
      navigate('/team');
    } catch (error) {
      console.error('팀 탈퇴 중 오류 발생:', error);
      alert('팀 탈퇴에 실패했습니다.');
    }
  };

  // 멤버 탈퇴 처리(관리자만 가능)
  const handleRemoveMember = async () => {
    if (!selectedMember) {
      alert('탈퇴시킬 멤버를 선택하세요.');
      return;
    }

    try {
      await removeMember(teamId, selectedMember);
      alert('멤버를 성공적으로 탈퇴시켰습니다.');
      setMemberData(memberData.filter((m) => m.userId !== selectedMember));
      setSelectedMember('');
    } catch (error) {
      console.error('멤버 탈퇴 중 오류 발생:', error);
      alert('멤버 탈퇴에 실패했습니다.');
    }
  };

  return (
    <div className='team-leave'>
      <Button onClick={handleLeaveTeam}>팀 탈퇴하기</Button>

      {userRole === 'manager' && ( // 관리자만 멤버 탈퇴 가능
        <div>
          <select
            className='team-leave__select'
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value='' disabled>
              탈퇴시킬 멤버 선택
            </option>
            {memberData.map((member) => (
              <option key={member.userId} value={member.userId}>
                {member.nickname} ({member.teamRole})
              </option>
            ))}
          </select>
          <Button onClick={handleRemoveMember}>팀 멤버 탈퇴시키기</Button>
        </div>
      )}
    </div>
  );
};

export default TeamLeave;
