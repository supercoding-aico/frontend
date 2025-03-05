import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import { useState, useRef } from 'react';
import { useEventListener } from '@hooks/useEventListener';
import '@styles/components/layout-page/sidebar-dropdown.scss';

const SidebarDropdown = ({ teams }) => {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [isOpen, setIsOpen] = useState(false);

  const selectTeam = (team) => {
    setSelectedTeam(team);
    setIsOpen(false);
    navigate(`/${team.id}/calendar`);
  };

  useEventListener('mousedown', (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  });

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
          <li key={team.id}>
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
