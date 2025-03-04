import { useState } from 'react';
import Button from '@components/common/Button';
import FormInput from '@components/common/FormInput';
import { inviteMember } from '@api/teamApi';

const TeamInvite = ({ teamId }) => {
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInviteMember = async () => {
    try {
      const data = await inviteMember(teamId, { email: inviteEmail });
      console.log('✅ Invite Successful:', data);
      alert('✅ Invitation sent successfully.');
      setInviteEmail('');
    } catch (error) {
      console.error('❌ Invite Failed:', error);
      alert('🚨 Failed to send the invitation. Please try again.');
    }
  };

  return (
    <div className='team-invite'>
      <FormInput
        type='email'
        placeholder='초대할 멤버의 이메일을 입력해주세요'
        value={inviteEmail}
        onChange={(val) => setInviteEmail(val)}
      />
      <Button type='submit' theme='accent' onClick={handleInviteMember}>
        초대
      </Button>
    </div>
  );
};

export default TeamInvite;
