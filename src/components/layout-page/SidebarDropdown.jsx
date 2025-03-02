import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import { useState } from 'react';
import '@styles/components/layout-page/sidebar-dropdown.scss';

const SidebarDropdown = ({ teams }) => {
  const navigate = useNavigate();

  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [isOpen, setIsOpen] = useState(false);

  const selectTeam = (team) => {
    setSelectedTeam(team);
    setIsOpen(false);
    navigate(`/${team.id}/calendar`);
  };

  return (
    <div className='dropdown'>
      <button className='dropdown__button' onClick={() => setIsOpen(!isOpen)}>
        <span className='dropdown__button--name'>{selectedTeam.name}</span>
        <span className='dropdown__button--icon'>
          <ChevronDown />
        </span>
      </button>
      {isOpen && (
        <ul className='options'>
          {teams.map((team) => (
            <li key={team.id}>
              <button onClick={() => selectTeam(team)} className='options__button'>
                {team.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarDropdown;
