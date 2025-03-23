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

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onToggle]);

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(menuId);
  };

  return (
    <div className='dropdownWrapper' ref={dropdownRef}>
      <AlignJustify className='menuIcon' onClick={handleToggle} />
      {isOpen && (
        <div className='dropdown'>
          {options.map(({ label, onClick }, idx) => (
            <button
              key={idx}
              onClick={() => {
                onClick();
                onToggle(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
