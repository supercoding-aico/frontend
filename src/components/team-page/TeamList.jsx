import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import P from '@components/common/P';
import '@styles/components/team-page/team-list.scss';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';
import { getTeamList } from '@api/teamApi';
import { AlignJustify } from 'react-feather';
import useTeamMutations from '@hooks/team/useTeam';
import { useQuery } from '@tanstack/react-query';

const TeamList = () => {
  const navigate = useNavigate();
  const { deleteMutation, updateMutation } = useTeamMutations();

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editedName, setEditedName] = useState('');

  const { data: teamData = [] } = useQuery({
    queryKey: ['teamList'],
    queryFn: getTeamList,
    select: (data) => data?.data?.content ?? [],
  });

  const handleTeamNameChange = (editedTeamName) => {
    setEditedName(editedTeamName);
  };

  const handleDeleteTeam = (teamId) => {
    deleteMutation.mutate(teamId);
    setDropdownOpen(null);
  };

  const handleEditedNameSend = () => {
    if (!editedName.trim()) {
      alert('팀 이름을 입력해 주세요.');
      return;
    }
    updateMutation.mutate({ teamId: selectedTeam.teamId, name: editedName });
  };

  const handleTitleClick = (team) => {
    navigate(`/team/detail/${team.teamId}`);
  };

  const toggleDropdown = (teamId) => {
    setDropdownOpen(dropdownOpen === teamId ? null : teamId);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setEditedName(team.name);
    setEditModalOpen(true);
    setDropdownOpen(null);
  };

  return (
    <div className='team-list'>
      <P theme='title'>팀 목록</P>
      {teamData?.map((team) => (
        <div className='team-list-item' key={team.teamId}>
          <span className='team-list-item__title' onClick={() => handleTitleClick(team)}>
            {team.name}
          </span>

          <AlignJustify
            className='team-list-item__menu'
            onClick={() => toggleDropdown(team.teamId)}
          />

          {dropdownOpen === team.teamId && (
            <div className='team-list-item__dropdown'>
              <button onClick={() => handleEditTeam(team)}>팀 이름 수정</button>
              <button onClick={() => handleDeleteTeam(team.teamId)}>팀 삭제</button>
            </div>
          )}
        </div>
      ))}

      {/* 팀 수정 모달 */}
      {editModalOpen && (
        <Modal onClose={() => setEditModalOpen(false)} onClick={handleEditedNameSend}>
          <FormInput
            label='팀 이름'
            type='text'
            value={editedName}
            onChange={handleTeamNameChange}
          />
        </Modal>
      )}
    </div>
  );
};

export default TeamList;
