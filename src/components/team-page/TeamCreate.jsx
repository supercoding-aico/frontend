import Button from '@components/common/Button';
import FormInput from '@components/common/FormInput';
import Modal from '@components/common/Modal';
import useTeamMutations from '@hooks/team/useTeam';
import '@styles/components/team-page/team-create.scss';
import { useState } from 'react';

const TeamCreate = () => {
  const { createMutation } = useTeamMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      alert('팀 이름을 입력해주세요.');
      return;
    }
    createMutation.mutate(
      { name: teamName },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setTeamName('');
        },
      }
    );
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTeamNameChange = (value) => {
    setTeamName(value);
  };

  return (
    <div className='team-create'>
      <Button type='button' theme='accent' onClick={handleModalOpen}>
        팀 만들기
      </Button>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onClick={handleCreateTeam}>
          <div>
            <FormInput label='팀 이름' type='text' onChange={handleTeamNameChange} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TeamCreate;
