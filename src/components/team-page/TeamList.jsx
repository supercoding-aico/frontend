import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import P from '@components/common/P';
import '@styles/components/team-page/team-list.scss';
import { FiMoreVertical } from 'react-icons/fi';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';
import { deleteTeam, getTeamList, updateTeam } from '@api/teamApi';

const TeamList = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [teamData, setTeamData] = useState([]);

  // 팀 목록 가져오기
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await getTeamList();
        console.log(data, '데이터');
        setTeamData(data.data.content);
      } catch (error) {
        console.error('팀 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchTeamData();
  }, []);

  // 팀 상세 페이지 이동
  const handleTitleClick = (team) => {
    navigate(`/team/detail/${team.teamId}`);
  };

  // 드롭다운 토글
  const toggleDropdown = (teamId) => {
    setDropdownOpen(dropdownOpen === teamId ? null : teamId);
  };

  // 팀 수정 버튼 클릭 시
  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setEditedName(team.name);
    setEditModalOpen(true);
    setDropdownOpen(null);
  };

  // 팀 삭제 API 요청
  const handleDeleteTeam = async (teamId) => {
    try {
      const data = await deleteTeam(teamId);
      console.log(data);
      alert('팀이 삭제되었습니다.');
      setTeamData(teamData.filter((team) => team.teamId !== teamId));
    } catch (error) {
      console.error('팀 삭제 중 오류 발생:', error);
      alert('팀 삭제 실패! 다시 시도해 주세요.');
    }
    setDropdownOpen(null);
  };

  // 팀 이름 변경 API 요청
  const handleEditedNameSend = async (teamId) => {
    if (!editedName.trim()) {
      alert('팀 이름을 입력해 주세요.');
      return;
    }

    try {
      const data = await updateTeam(selectedTeam.teamId, { name: editedName });
      alert('팀 이름이 수정되었습니다.');

      setTeamData((prevTeams) =>
        prevTeams.map((team) =>
          team.teamId === selectedTeam.teamId ? { ...team, name: editedName } : team
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error(' 팀 수정 중 오류 발생:', error);
      alert(' 팀 수정 실패! 다시 시도해 주세요.');
    }
  };

  // 팀 이름 입력 변경 핸들러
  const handleTeamNameChange = (editedTeamName) => {
    setEditedName(editedTeamName);
  };

  return (
    <div className='team-list'>
      <P theme='title'>팀 목록</P>
      {teamData.map((team) => (
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
