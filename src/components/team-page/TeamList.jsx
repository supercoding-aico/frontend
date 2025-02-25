import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import P from '@components/common/P';
import '@styles/components/team-page/team-list.scss';
import { FiMoreVertical } from 'react-icons/fi';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';

const teamsData = [
  { teamId: 1, name: '프로젝트 화이팅' },
  { teamId: 2, name: '팀 버스터즈' },
  { teamId: 3, name: '코드 챔피언' },
  { teamId: 4, name: '혁신 팀' },
  { teamId: 5, name: '아이디어 팩토리' },
];

const TeamList = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleTitleClick = (team) => {
    navigate(`/team/detail/${team.teamId}`);
  };

  const toggleDropdown = (teamId) => {
    setDropdownOpen(dropdownOpen === teamId ? null : teamId);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setEditModalOpen(true);
    setDropdownOpen(null);
  };

  const handleDeleteTeam = (teamId) => {
    console.log(`팀 삭제: ${teamId}`);
    setDropdownOpen(null);
  };

  const handleEditedNameSend = () => {
    setEditModalOpen(false);
  };

  const handleTeamNameChange = (e) => {
    setEditedName(e.target.value);
  };

  return (
    <div className='team-list'>
      <P theme='title'>팀 목록</P>
      {teamsData.map((team) => (
        <div className='team-list-item' key={team.teamId}>
          <span className='team-list-item__title' onClick={() => handleTitleClick(team)}>
            {team.name}
          </span>

          <FiMoreVertical
            className='team-list-item__menu'
            onClick={() => toggleDropdown(team.teamId)}
          />

          {dropdownOpen === team.teamId && (
            <div className='team-list-item__dropdown'>
              <button onClick={() => handleEditTeam(team)}>팀 수정</button>
              <button onClick={() => handleDeleteTeam(team.teamId)}>팀 삭제</button>
            </div>
          )}
        </div>
      ))}

      {/* 팀 수정 모달 */}
      {editModalOpen && (
        <Modal
          team={selectedTeam}
          onClose={() => setEditModalOpen(false)}
          onClick={handleEditedNameSend}
        >
          <FormInput label='팀 이름' type='text' onChange={handleTeamNameChange} />
        </Modal>
      )}
    </div>
  );
};

export default TeamList;
