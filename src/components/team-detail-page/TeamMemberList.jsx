import { useQuery } from '@tanstack/react-query';
import { getTeamMember } from '@api/teamApi';
import '@styles/components/team-detail-page/team-member-list.scss';
import { AlignJustify } from 'react-feather';
import { useState } from 'react';
import useTeamMutations from '@hooks/team/useTeam';

const TeamMemberList = ({ teamId, loggedInUserId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { removeMemberMutation } = useTeamMutations();

  const {
    data: memberData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['teamMembers', teamId],
    queryFn: () => getTeamMember(teamId),
    enabled: !!teamId,
  });

  const loggedInUserRole =
    memberData?.data?.find((member) => member.userId === loggedInUserId)?.teamRole || 'MEMBER';
  console.log(loggedInUserId);
  const handleRemoveMember = (userId) => {
    removeMemberMutation.mutate({ teamId, userId });
    setDropdownOpen(null);
  };

  if (isLoading) return <div className='team-member-list__loading'>로딩 중...</div>;
  if (isError)
    return <p className='team-member-list__error'>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className='team-member-list'>
      <table className='team-member-list__table'>
        <thead>
          <tr>
            <th className='team-member-list__header'>멤버</th>
            <th className='team-member-list__header'>역할</th>
            <th className='team-member-list__header' />
          </tr>
        </thead>
        <tbody>
          {memberData?.data?.length > 0 ? (
            memberData.data.map((member) => (
              <tr key={member.userId} className='team-member-list__row'>
                <td className='team-member-list__name'>{member.nickname}</td>
                <td className='team-member-list__role'>{member.teamRole}</td>
                {loggedInUserRole === 'MANAGER' && member.userId !== loggedInUserId && (
                  <td className='team-member-list__actions'>
                    <AlignJustify
                      className='team-member-list__icon'
                      onClick={() =>
                        setDropdownOpen((prev) => (prev === member.userId ? null : member.userId))
                      }
                    />
                    {dropdownOpen === member.userId && (
                      <div className='team-member-list__dropdown'>
                        <button onClick={() => handleRemoveMember(member.userId)}>
                          탈퇴시키기
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3' className='team-member-list__empty'>
                팀 멤버가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMemberList;
