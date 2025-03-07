import Button from '@components/common/Button';
import useTeamMutations from '@hooks/team/useTeam';
import '@styles/components/team-detail-page/team-detail.scss';

const TeamLeave = ({ teamId, loggedInUserId }) => {
  const { leaveMutation } = useTeamMutations();
  const leaveTeam = leaveMutation(teamId, loggedInUserId);

  return (
    <div className='team-leave'>
      <Button onClick={() => leaveTeam.mutate()}>팀 탈퇴하기</Button>
    </div>
  );
};

export default TeamLeave;
