import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'react-feather';
import { toast } from 'react-toastify';
import { useState } from 'react';
import '@styles/pages/home-page.scss';
import TeamCard from '@components/home-page/TeamCard';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';
import { getTeamList } from '@api/teamApi';
import useTeamMutations from '@hooks/team/useTeam';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');

  const { createMutation } = useTeamMutations(setIsModalOpen, setTeamName);

  // TODO: hook으로 분리
  const { data: teams = [] } = useQuery({
    queryKey: ['teamList'],
    queryFn: getTeamList,
    select: (data) => data?.data?.content ?? [],
  });

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error('팀 이름을 입력해주세요.');
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
    <>
      <div className='team-container'>
        <button type='button' onClick={handleModalOpen} className='team-container__add-button'>
          <Plus />
        </button>
        {teams &&
          teams.map((team) => (
            <Link key={team.teamId} to={`/team/${team.teamId}/calendar`}>
              <TeamCard team={team} />
            </Link>
          ))}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onClick={handleCreateTeam}>
          <div>
            <FormInput label='팀 이름' type='text' onChange={handleTeamNameChange} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default HomePage;
