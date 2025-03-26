import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChevronDown } from 'react-feather';
import { useEffect, useState, useRef } from 'react';
import '@styles/components/layout-page/sidebar-dropdown.scss';
import { useEventListener } from '@hooks/useEventListener';
import { setLatestTeam } from '@redux/slice/teamSlice';

const SidebarDropdown = ({ teams = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);
  const [selectedTeam, setSelectedTeam] = useState({
    teamId: null,
    name: '',
    lastReadAt: '',
    lastMessageAt: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const selectTeam = (team) => {
    setSelectedTeam(team);
    setIsOpen(false);
    dispatch(setLatestTeam(team));
    navigate(`team/${team.teamId}/calendar`);
  };

  useEventListener('mousedown', (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  });

  /* 마지막으로 채팅방을 확인한 팀을 기본으로 선택 */
  useEffect(() => {
    if (teams.length > 0) {
      const latestTeam = [...teams].sort(
        (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
      )[0];
      setSelectedTeam(latestTeam);
      dispatch(setLatestTeam(latestTeam));
    }
  }, [teams]);

  return (
    <div className='dropdown' ref={dropdownRef}>
      <button className='dropdown__button' onClick={() => setIsOpen(!isOpen)}>
        <span className='dropdown__button--name'>{selectedTeam.name}</span>
        <span className='dropdown__button--icon'>
          <ChevronDown />
        </span>
      </button>
      <ul className={`options ${isOpen ? 'options--show' : ''}`}>
        {teams.map((team) => (
          <li key={team.teamId}>
            <button onClick={() => selectTeam(team)} className='options__button'>
              {team.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarDropdown;
