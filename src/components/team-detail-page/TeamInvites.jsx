import { useState } from 'react';
import Button from '@components/common/Button';
import FormInput from '@components/common/FormInput';
import useTeamMutations from '@hooks/team/useTeam';
import '@styles/components/team-detail-page/team-detail.scss';

const TeamInvite = ({ teamId }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const { inviteMemberMutation } = useTeamMutations();
  const inviteMutation = inviteMemberMutation(teamId);

  return (
    <div className='team-invite'>
      <div className='team-invite-wrapper'>
        <FormInput
          type='email'
          placeholder='초대할 멤버의 이메일을 입력해주세요'
          value={inviteEmail}
          onChange={(val) => setInviteEmail(val)}
        />
        <Button type='submit' theme='accent' onClick={() => inviteMutation.mutate(inviteEmail)}>
          초대
        </Button>
      </div>
    </div>
  );
};

export default TeamInvite;
