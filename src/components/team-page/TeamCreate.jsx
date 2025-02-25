import Button from '@components/common/Button';
import FormInput from '@components/common/FormInput';
import Modal from '@components/common/Modal';
import '@styles/components/team-page/team-create.scss';
import { useState } from 'react';

const TeamCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');

  const handleCreateTeam = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTeamNameChange = (value) => {
    setTeamName(value);
  };

  const handleConfirmTeamCreation = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='team-create'>
      <Button type='button' theme='accent' onClick={handleCreateTeam}>
        팀 만들기
      </Button>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onClick={handleConfirmTeamCreation}>
          <div>
            <FormInput label='팀 이름' type='text' onChange={handleTeamNameChange} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TeamCreate;
