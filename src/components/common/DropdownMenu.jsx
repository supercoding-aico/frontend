import { useEffect, useRef } from 'react';
import { AlignJustify } from 'react-feather';
import '@styles/components/common/dropdown.scss';

const DropdownMenu = ({ menuId, isOpen, onToggle, options = [] }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onToggle(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onToggle]);

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(menuId);
  };

  const handleOptionClick = (e, onClick) => {
    e.stopPropagation();
    onClick();
    onToggle(null);
  };

  return (
    <div className='dropdownWrapper' ref={dropdownRef}>
      <AlignJustify className='menuIcon' onClick={handleToggle} />
      {isOpen && (
        <div className='dropdown'>
          {options.map(({ label, onClick }, idx) => (
            <button key={idx} onClick={(e) => handleOptionClick(e, onClick)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
