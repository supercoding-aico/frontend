import { createTeam } from '@api/teamApi';
import Button from '@components/common/Button';
import FormInput from '@components/common/FormInput';
import Modal from '@components/common/Modal';
import '@styles/components/team-page/team-create.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeamCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleCreateTeam = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTeamNameChange = (value) => {
    setTeamName(value);
  };

  const handleConfirmTeamCreation = async () => {
    try {
      const data = await createTeam({ name: teamName });
      if (data.status === 200 || data.status === 201) {
        alert('팀이 생성되었습니다');
        setIsModalOpen(false);
      } else {
        console.error('Failed to create team', data);
      }
    } catch (error) {
      console.error('Error creating team:', error);

      if (error.data?.status === 401) {
        alert('로그인이 필요합니다');
        navigate('/login');
      }
    }
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
