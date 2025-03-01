import { useState } from 'react';
import Button from '@components/common/Button';
import FormInput from '@components/common/FormInput';
import { inviteMember } from '@api/teamApi';

const TeamInvite = ({ teamId }) => {
  const [inviteEmail, setInviteEmail] = useState('');

  const handleEmailChange = (e) => {
    setInviteEmail(e.target.value);
  };

  const handleInviteMember = async () => {
    try {
      console.log('🔍 Invite API Call:', `/api/team/${teamId}/invite`);
      const data = await inviteMember(teamId, { email: inviteEmail });
      console.log('✅ Invite Successful:', data);
      alert('✅ Invitation sent successfully.');
      setInviteEmail(''); // Clear input after success
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
        onChange={handleEmailChange}
      />
      <Button type='submit' theme='accent' onClick={handleInviteMember}>
        초대
      </Button>
    </div>
  );
};

export default TeamInvite;
