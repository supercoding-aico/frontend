import instance from '@axios/axios';
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
      console.log('📤 팀 생성 요청 시작...');
      console.log('📤 보내는 데이터:', JSON.stringify({ name: teamName }));
      console.log('📏 Content-Length:', JSON.stringify({ name: teamName }).length);
      const response = await instance.post('/api/team', { name: teamName });

      console.log('✅ Response received:', response);

      if (response.status === 200) {
        alert('팀이 생성되었습니다');
        setIsModalOpen(false);
      } else {
        console.error('Failed to create team', response);
      }
    } catch (error) {
      console.error('Error creating team:', error);

      if (error.response?.status === 401) {
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
